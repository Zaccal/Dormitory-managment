/* eslint-disable @typescript-eslint/no-explicit-any */
import { queryClient } from "@/providers/QueryProviderClient"
import { IUserCreate } from "@/types/createUser.type"
import type { AuthError, Session, User, WeakPassword } from "@supabase/supabase-js"
import { useMutation, UseMutationResult, useQuery } from "@tanstack/react-query"
import { createContext, ReactNode, useContext, useEffect } from "react"
import supabase from "../utils/supabase"
import { useToast } from "./use-toast"

export interface SignInData {
  email: string
  password: string
}

type TypeSignInType = UseMutationResult<
  | {
      user: User
      session: Session
      weakPassword?: WeakPassword
    }
  | {
      user: null
      session: null
      weakPassword?: null
    },
  AuthError,
  SignInData,
  unknown
>

interface AuthContextType {
  user: User | null | undefined
  signIn: (data: SignInData) => Promise<User | null>
  singUp: (data: IUserCreate) => Promise<any | null>
  signOut: () => Promise<void>
  signInMutation: TypeSignInType
  signUpMutation: UseMutationResult<any, Error, IUserCreate, unknown>
  signOutMutation: UseMutationResult<void, Error, void, unknown>
  isLoading: boolean
  isFetching: boolean
  isFetched: boolean
  isError: boolean
  error: Error | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useProvideAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

function useProvideAuth(): AuthContextType {
  const { toast } = useToast()

  const { data: user, ...params } = useQuery({
    queryKey: ["user-auth"],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getSession()
      if (error) throw error
      return data.session?.user ?? null
    },
    select(data) {
      return data
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  })

  const signInMutation: TypeSignInType = useMutation({
    mutationFn: async ({ email, password }: SignInData) => {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-auth"] })
    },
  })

  const signOutMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.setQueryData(["user-auth"], null)
    },
  })

  const createUser = async ({ token, ...data }: IUserCreate) => {
    const res = await fetch("/api/create-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.error || "Ошибка запроса")
    }

    return res.json()
  }

  const signUpMutation = useMutation({
    mutationFn: createUser,
    onError: error => {
      toast({
        title: error.message,
        variant: "destructive",
      })
    },
  })

  const signIn = async (data: SignInData) => {
    return (await signInMutation.mutateAsync(data)).user
  }

  const signOut = async () => {
    await signOutMutation.mutateAsync()
  }

  const singUp = async (data: IUserCreate) => {
    return await signUpMutation.mutateAsync(data)
  }

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      queryClient.invalidateQueries({ queryKey: ["user-auth"] })
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryClient])

  return {
    user,
    ...params,
    singUp,
    signIn,
    signOut,
    signInMutation,
    signUpMutation,
    signOutMutation,
  }
}

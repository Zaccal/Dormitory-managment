/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@supabase/supabase-js"

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
)

interface IBodyRequest {
  email?: string
  password?: string
  first_name?: string
  last_name?: string
  home_address?: string
  room_number?: number
  phone: string
  father_phone?: string
  mother_phone?: string
  patronymic?: string
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const token = req.headers.authorization?.split(" ")[1]

  const { email, password, ...profileData }: Partial<IBodyRequest> = req.body

  const { data: checkedData, error: isCheckedDataError } = await supabaseAdmin
    .from("profiles")
    .select("email,phone")
    .or(`email.eq.${email}, phone.eq.${profileData.phone}`)

  if (isCheckedDataError)
    return res.status(400).json({ error: isCheckedDataError?.message || "Somethink went wrong" })
  if (checkedData?.length)
    return res
      .status(400)
      .json({ error: "Пользователь с таким телефоном или почтой уже существует" })

  if (!token) return res.status(401).json({ error: "Unauthorized" })

  if (!email && !password) return res.status(400).json({ error: "Email and password are required" })

  const { data: user, error: authError } = await supabaseAdmin.auth.getUser(token)

  if (authError && !user) return res.status(401).json({ error: "Invalid token" })

  const userId = user.user!.id

  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select("role")
    .eq("user_id", userId)
    .single()

  if (error && !data) return res.status(403).json({ error: "No profile found" })

  if (data.role !== "administrator") return res.status(403).json({ error: "Access denied" })

  const { data: newUserData, error: newUserError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })
  if (error || !newUserData || !newUserData.user)
    return res.status(400).json({ error: newUserError?.message || "Somethink went wrong" })

  if (newUserData.user?.id) {
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .insert({
        user_id: newUserData.user.id,
        email,
        ...profileData,
      })
      .select()
    if (profileError) return res.status(400).json({ error: profileError.message })
  }
  await supabaseAdmin.from("requests").delete().eq("email", newUserData.user.email)

  res.status(200).json({ ...newUserData.user })
}

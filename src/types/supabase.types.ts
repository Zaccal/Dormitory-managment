export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          expired_at: string
          id: string
          message: string
          read: boolean | null
          type: Database["public"]["Enums"]["type_notification"]
          user_id: string
        }
        Insert: {
          created_at?: string
          expired_at: string
          id?: string
          message: string
          read?: boolean | null
          type?: Database["public"]["Enums"]["type_notification"]
          user_id: string
        }
        Update: {
          created_at?: string
          expired_at?: string
          id?: string
          message?: string
          read?: boolean | null
          type?: Database["public"]["Enums"]["type_notification"]
          user_id?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          id: string
          payment_method: Database["public"]["Enums"]["payment_method"]
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          payment_method?: Database["public"]["Enums"]["payment_method"]
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          payment_method?: Database["public"]["Enums"]["payment_method"]
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          father_phone: string | null
          first_name: string
          home_address: string
          id: string
          is_paid: boolean
          last_name: string
          mother_phone: string | null
          patronymic: string | null
          phone: string
          photo_face: string | null
          role: Database["public"]["Enums"]["role"] | null
          room_number: number
          status: Database["public"]["Enums"]["Status of student"] | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          father_phone?: string | null
          first_name: string
          home_address: string
          id?: string
          is_paid?: boolean
          last_name: string
          mother_phone?: string | null
          patronymic?: string | null
          phone: string
          photo_face?: string | null
          role?: Database["public"]["Enums"]["role"] | null
          room_number: number
          status?: Database["public"]["Enums"]["Status of student"] | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          father_phone?: string | null
          first_name?: string
          home_address?: string
          id?: string
          is_paid?: boolean
          last_name?: string
          mother_phone?: string | null
          patronymic?: string | null
          phone?: string
          photo_face?: string | null
          role?: Database["public"]["Enums"]["role"] | null
          room_number?: number
          status?: Database["public"]["Enums"]["Status of student"] | null
          user_id?: string | null
        }
        Relationships: []
      }
      requests: {
        Row: {
          address: string
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          patronymic: string | null
          phone: string
          phone_father: string
          phone_mother: string
        }
        Insert: {
          address: string
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          patronymic?: string | null
          phone: string
          phone_father: string
          phone_mother: string
        }
        Update: {
          address?: string
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          patronymic?: string | null
          phone?: string
          phone_father?: string
          phone_mother?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      payment_method: "CASH" | "KASPI"
      role:
        | "administrator"
        | "main_superintendent"
        | "superintendent"
        | "student"
      "Status of student":
        | "IN_DORMITORY"
        | "IN_HOME"
        | "IS_ILL"
        | "IN_COLLAGE"
        | "OUTSIDE"
      type_notification: "Warning" | "Important" | "info"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

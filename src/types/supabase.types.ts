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
          type: Database["public"]["Enums"]["type_notification"]
          user_id: string
        }
        Insert: {
          created_at?: string
          expired_at: string
          id?: string
          message: string
          type?: Database["public"]["Enums"]["type_notification"]
          user_id: string
        }
        Update: {
          created_at?: string
          expired_at?: string
          id?: string
          message?: string
          type?: Database["public"]["Enums"]["type_notification"]
          user_id?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: string
          created_at: string
          id: string
          payment_method: Database["public"]["Enums"]["payment_method"]
          purpose: Database["public"]["Enums"]["payment_purpose"]
          reasone: string
          student_profile_id: string | null
        }
        Insert: {
          amount: string
          created_at?: string
          id?: string
          payment_method?: Database["public"]["Enums"]["payment_method"]
          purpose: Database["public"]["Enums"]["payment_purpose"]
          reasone: string
          student_profile_id?: string | null
        }
        Update: {
          amount?: string
          created_at?: string
          id?: string
          payment_method?: Database["public"]["Enums"]["payment_method"]
          purpose?: Database["public"]["Enums"]["payment_purpose"]
          reasone?: string
          student_profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_student_profile_id_fkey2"
            columns: ["student_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
      payment_purpose: "student_payment" | "dormitory_expenses"
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      payment_method: ["CASH", "KASPI"],
      payment_purpose: ["student_payment", "dormitory_expenses"],
      role: [
        "administrator",
        "main_superintendent",
        "superintendent",
        "student",
      ],
      "Status of student": [
        "IN_DORMITORY",
        "IN_HOME",
        "IS_ILL",
        "IN_COLLAGE",
        "OUTSIDE",
      ],
      type_notification: ["Warning", "Important", "info"],
    },
  },
} as const

import { Database } from "./supabase.types";

export type TypeEnumStatus = Database["public"]["Enums"]["Status of student"];
export type TypeEnumRole = Database["public"]["Enums"]["role"];

export const enum EnumPurpusePayment {
  STUDENT_PAYMENT = "studentPayment",
  DROMITORY_EXPENSES = "dormitory_expenses",
}

import supabase from "./supabase"

async function uploadAvatar(file: File, userId: string) {
  const fileExt = file.name.split(".").pop()
  const fileName = `${userId}.${fileExt}`
  const filePath = `avatars/${fileName}`

  const { data, error } = await supabase.storage
    .from("photo_faces")
    .upload(filePath, file, { upsert: true })

  if (error) {
    console.error("Ошибка загрузки:", error.message)
    return null
  }

  return filePath
}

export async function updateUserAvatar(file: File, userId: string) {
  const filePath = await uploadAvatar(file, userId)
  if (!filePath) return

  const { error } = await supabase
    .from("profiles")
    .update({ photo_face: filePath })
    .eq("id", userId)

  if (error) console.error("Ошибка обновления профиля:", error.message)
}

export async function deleteAvatar(filePath: string, userId: string) {
  const { error } = await supabase.storage.from("avatars").remove([filePath])

  if (!error) {
    await supabase.from("profiles").update({ photo_face: null }).eq("id", userId)
    return true
  }

  return false
}

export async function getAvatarUrl(filePath: string) {
  const { data, error } = await supabase.storage.from("avatars").createSignedUrl(filePath, 60 * 60) // URL на 1 час

  return error ? null : data.signedUrl
}

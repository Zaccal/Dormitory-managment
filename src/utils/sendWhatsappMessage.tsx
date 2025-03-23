export const sendWhatsappMessage = async (number: string, message: string) => {
  const url = `https://web.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(
    message
  )}&app_absent=0`

  window.open(url, "_blank")
}

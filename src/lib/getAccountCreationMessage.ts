interface ITextMessage {
    login: string
    password: string
    url: string
}

export function getAccountCreationMessage({
    login,
    password,
    url,
}: ITextMessage) {
    return `
Здравствуйте!
Ваша учетная запись на сайте общежития была создана. Используйте следующие данные для входа:

🔹 Логин: ${login}
🔹 Пароль: ${password}

📌 Пожалуйста, смените пароль после первого входа для безопасности.
📌 Если у вас возникли вопросы, обратитесь в поддержку.

Ссылка для входа: ${url}

С уважением,
Администрация общежития
    `
}

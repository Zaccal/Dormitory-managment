import LoginForm from "@/components/shared/AuthorizationForms/LoginForm"
import RegisterForm from "@/components/shared/AuthorizationForms/RegisterForm"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const Authorization = () => {
  return (
    <>
      <div className="flex flex-col gap-6 max-w-lg mx-auto mt-[12%]">
        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col items-center gap-2">
            <a href="#" className="flex flex-col items-center gap-2 font-medium">
              <div className="mb-12 flex h-8 w-8 items-center justify-center rounded-md">
                <img src="/logo.png" className="max-w-48" />
              </div>
            </a>
            <h1 className="text-2xl font-bold"> Добро пожаловать!</h1>
            <div className="text-center text-sm">
              Пожалуйста, войдите в свою учетную запись, чтобы получить доступ к вашему личному
              кабинету.
            </div>
          </div>

          <Tabs defaultValue="login">
            <TabsList className="grid mb-5 w-full grid-cols-2">
              <TabsTrigger value="login">Вход</TabsTrigger>
              <TabsTrigger value="register">Подать заявку</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="w-full">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}

export default Authorization

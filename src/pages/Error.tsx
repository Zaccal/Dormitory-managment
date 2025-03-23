interface IError {
  status?: number | string
  title?: string
  description?: string
}

const Error = ({
  status = 404,
  description = "Такой страницы не найдено попробуи еще раз",
  title = "Упс что то не так!",
}: IError) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="">
        <h1 className="text-8xl font-black text-center tracking-wider text-accent-foreground">
          {status}
        </h1>
        <h2 className="text-4xl pt-2 text-center font-black tracking-wider text-accent-foreground">
          {title}
        </h2>
        <p className="text-center mt-5">{description}</p>
      </div>
    </div>
  )
}

export default Error

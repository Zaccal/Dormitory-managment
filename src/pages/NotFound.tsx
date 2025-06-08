const NotFound = () => {
    return (
        <div className="h-screen w-full flex items-center justify-center">
            <div className="">
                <h1 className="text-8xl font-black text-center tracking-wider text-accent-foreground">
                    404
                </h1>
                <h2 className="text-4xl pt-2 text-center font-black tracking-wider text-accent-foreground">
                    Not found
                </h2>

                <p className="text-center mt-5">
                    Такой страницы не найдено попробуи еще раз
                </p>
            </div>
        </div>
    )
}

export default NotFound

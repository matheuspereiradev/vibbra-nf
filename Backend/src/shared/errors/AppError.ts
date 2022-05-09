class AppError {
    public readonly message: string;
    public readonly statusCode: number;

    constructor(msg: string, code = 400) {
        this.message = msg;
        this.statusCode = code;
    }

}

export default AppError;
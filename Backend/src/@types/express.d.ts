declare namespace Express {
    export interface Request {
        user: {
            id: number;
            email: string;
            name: string;
        },
        company: {
            id: number;
        },

    }
}
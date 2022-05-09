import { Request, Response } from "express";
import { container } from 'tsyringe';
import { AuthUserService } from "../services/AuthUser.service";
import { RecoveryTokenInfoService } from "../services/recoveryTokenInfo.service";
import userView from "../views/user.view";

class SessionController {
    async create(request: Request, response: Response) {
        const { email, password } = request.body;
        const sessionService = container.resolve(AuthUserService);
        const { user, token } = await sessionService.authenticate({
            email,
            password
        });
        return response.status(200).json({ user: userView.render(user), token });
    }


    async find(request: Request, response: Response): Promise<unknown> {
        const { token } = request.params;
        const recoveryTokenInfoService = container.resolve(RecoveryTokenInfoService);
        const user = await recoveryTokenInfoService.execute(token);
        return response.status(200).json(userView.render(user));
    }

}

export { SessionController };

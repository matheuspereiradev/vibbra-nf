import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UserRepository } from '../models/repositories/User.repository';
import { CreateUserService } from '../services/CreateUser.service';
import { DeleteUserService } from '../services/DeleteUser.service';
import { UpdateUserService } from '../services/UpdateUser.service';
import userView from '../views/user.view';

class UserController {

    async show(request: Request, response: Response) {
        const userRepository = new UserRepository();
        const all = await userRepository.findAll();
        return response.status(200).json(userView.renderMany(all));
    }
    async find(request: Request, response: Response) {
        const { id } = request.params;
        const userRepository = new UserRepository();
        const user = await userRepository.findByID(+id);
        return response.status(200).json(userView.render(user));
    }

    async create(request: Request, response: Response) {
        const { name, surname, email, password } = request.body;
        const createService = container.resolve(CreateUserService);
        const user = await createService.execute({ name, email, password, surname })
        return response.status(201).json(userView.render(user));

    }

    async update(request: Request, response: Response) {
        const { name, surname, email, password } = request.body;
        const { id } = request.params;
        const updateUserService = container.resolve(UpdateUserService);
        const user = await updateUserService.execute({ id: +id, name, surname, email, password });
        return response.status(200).json(userView.render(user));

    }
    async delete(request: Request, response: Response) {
        const { id } = request.params;
        const deleteUserService = container.resolve(DeleteUserService);
        await deleteUserService.execute(+id);
        return response.status(200).json({ message: "Successfuly excluded" });

    }

};

export { UserController };
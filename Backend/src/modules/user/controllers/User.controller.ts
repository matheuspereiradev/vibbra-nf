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
        const id = request.company.id;
        const all = await userRepository.findAll(+id);
        return response.status(200).json(userView.renderMany(all));
    }
    async find(request: Request, response: Response) {
        const { id } = request.params;
        const idCompany = request.company.id;
        const userRepository = new UserRepository();
        const user = await userRepository.findByID(+id,idCompany);
        return response.status(200).json(userView.render(user));
    }

    async create(request: Request, response: Response) {
        const { name, surname, email, password } = request.body;
        const idCompany = request.company.id;
        const createService = container.resolve(CreateUserService);
        const user = await createService.execute({ name, email, password, surname, idCompany })
        return response.status(201).json(userView.render(user));

    }

    async update(request: Request, response: Response) {
        const { name, surname, email, password } = request.body;
        const { id } = request.params;
        const idCompany = request.company.id;
        const updateUserService = container.resolve(UpdateUserService);
        const user = await updateUserService.execute({ id: +id, name, surname, email, password },idCompany);
        return response.status(200).json(userView.render(user));

    }
    async delete(request: Request, response: Response) {
        const { id } = request.params;
        const idCompany = request.company.id;
        const deleteUserService = container.resolve(DeleteUserService);
        await deleteUserService.execute(+id, idCompany);
        return response.status(200).json({ message: "Successfuly excluded" });

    }

};

export { UserController };
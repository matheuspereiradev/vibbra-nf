
import IUserRepository from '../../interfaces/IUserRepository';
import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/User';
import ICreateUserDTO from '../../interfaces/ICreateUserDTO';
import IUpdateUserDTO from '../../interfaces/IUpdateUserDTO';

class UserRepository implements IUserRepository {

    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User)
    }

    public async findByEmail(email: string): Promise<User> {
        const all = await this.ormRepository.findOne({ where: { email } });
        return all;
    };

    public async findByID(id: number): Promise<User> {
        const all = await this.ormRepository.findOne({ where: { id } });
        return all;
    };

    public async findAll(): Promise<Array<User>> {
        const all = await this.ormRepository.find();
        return all;
    }
    public async create(data: ICreateUserDTO): Promise<User> {
        const user = this.ormRepository.create(data);
        await this.ormRepository.save(user);
        return user;
    }
    public async update({ name, surname, email, password, id }: IUpdateUserDTO): Promise<User> {
        const user = await this.ormRepository.findOne({ where: { id } });
        Object.assign(user, { name, surname, email, password });
        await this.ormRepository.save(user);
        return user;
    }

    public async delete(id: number): Promise<void> {
        await this.ormRepository.softDelete(id);
        return;
    }


}

export { UserRepository }
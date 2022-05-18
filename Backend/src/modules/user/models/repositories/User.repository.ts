
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
        const all = await this.ormRepository.findOne({ where: { email }, relations: ['company'] });
        return all;
    };

    public async findByID(id: number, idCompany?: number): Promise<User> {
        const all = await this.ormRepository.findOne({ where: { id, idCompany }, relations: ['company'] });
        return all;
    };
    public async findOwner(idCompany: number): Promise<User> {
        const all = await this.ormRepository.findOne({ where: { idCompany, isOwner: true } });
        return all;
    };

    public async findAll(idCompany: number): Promise<Array<User>> {
        const all = await this.ormRepository.find({ where: { idCompany } });
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

    public async removeCompanyFromUsers(company: number): Promise<void> {
        await this.ormRepository
            .createQueryBuilder()
            .update(User)
            .set({ idCompany: null })
            .where("idCompany = :id", { id: company })
            .execute()

        return;
    }

    public async setOwner(id: number, idCompany: number, isOwner: boolean): Promise<User> {
        const user = await this.ormRepository.findOne({ where: { id } });
        Object.assign(user, { idCompany, isOwner });
        await this.ormRepository.save(user);
        return user;
    }

    public async delete(id: number): Promise<void> {
        await this.ormRepository.softDelete(id);
        return;
    }


}

export { UserRepository }
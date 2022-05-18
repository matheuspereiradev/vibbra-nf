import { sign } from 'jsonwebtoken';
import Error from '../../../shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IHashProvider from '../../../shared/providers/HashProvider/models/IHashProvider';
import AppError from '../../../shared/errors/AppError';
import ICompanyRepository from '../interfaces/ICompanyRepository';
import ICreateCompanyDTO from '../interfaces/ICreateCompanyDTO';
import { Company } from '../models/entities/Company';
import IUserRepository from '../../user/interfaces/IUserRepository';


@injectable()
export class CreateCompanyService {

    constructor(
        @inject('CompanyRepository')
        private repository: ICompanyRepository,

        @inject('UserRepository')
        private repositoryUser: IUserRepository,
    ) { }

    public async execute({ cnpj, corporateName, name }: ICreateCompanyDTO, idUser:number): Promise<Company> {

        await this.validateCNPJ(cnpj);

        const company = await this.repository.create({
            cnpj, corporateName, name
        });

        await this.repositoryUser.setOwner(idUser, company.id, true)

        return company;
    }

    public async validateCNPJ(cnpj: string): Promise<void> {
        const cnpjAlreadyUse = await this.repository.findByCNPJ(cnpj);

        if (cnpjAlreadyUse) {
            throw new AppError('CNPJ already in use', 409);
        }
    }
};
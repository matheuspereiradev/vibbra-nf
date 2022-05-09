import { sign } from 'jsonwebtoken';
import Error from '../../../shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IHashProvider from '../../../shared/providers/HashProvider/models/IHashProvider';
import AppError from '../../../shared/errors/AppError';
import ICompanyRepository from '../interfaces/ICompanyRepository';
import ICreateCompanyDTO from '../interfaces/ICreateCompanyDTO';
import { Company } from '../models/entities/Company';


@injectable()
export class CreateCompanyService {

    constructor(
        @inject('CompanyRepository')
        private repository: ICompanyRepository
    ) { }

    public async execute({ cnpj, corporateName, name }: ICreateCompanyDTO): Promise<Company> {

        await this.validateCNPJ(cnpj);

        const company = await this.repository.create({
            cnpj, corporateName, name
        });

        return company;
    }

    public async validateCNPJ(cnpj: string): Promise<void> {
        const cnpjAlreadyUse = await this.repository.findByCNPJ(cnpj);

        if (cnpjAlreadyUse) {
            throw new AppError('CNPJ already in use', 409);
        }
    }
};
import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import ICompanyRepository from '../interfaces/ICompanyRepository';
import IUpdateCompanyDTO from '../interfaces/IUpdateCompanyDTO';
import { Company } from '../models/entities/Company';


@injectable()
export class UpdateCompanyService {
    constructor(
        @inject('CompanyRepository')
        private repository: ICompanyRepository
    ) { }

    public async execute({ id, cnpj, corporateName, name }: IUpdateCompanyDTO): Promise<Company> {
        await this.validateCNPJ(id, cnpj);

        if (!await this.repository.findByID(id))
            throw new AppError('Company not found')

        const company = await this.repository.update({
            id, cnpj, corporateName, name
        });

        return company;
    }


    public async validateCNPJ(id: number, cnpj: string): Promise<void> {
        const company = await this.repository.findByCNPJ(cnpj);

        if (company && id !== company.id) {
            throw new AppError('CNPJ already in use', 409);
        }
    }

}
import { inject, injectable } from 'tsyringe';
import ICompanyRepository from '../interfaces/ICompanyRepository';


@injectable()
export class DeleteCompanyService {
    constructor(
        @inject('CompanyRepository')
        private repository: ICompanyRepository
    ) { }

    public async execute(id: number): Promise<void> {

        //TODO: VALIDAR SE JÁ TEM NOTAS PARA

        await this.repository.delete(id);
    }


}

import { getRepository, ILike, Repository } from 'typeorm';
import ICreateInvoiceDTO from '../../interfaces/ICreateInvoiceDTO';
import IInvoiceRepository from '../../interfaces/IInvoiceRepository';
import IUpdateInvoiceDTO from '../../interfaces/IUpdateInvoiceDTO';
import { Invoice } from '../entities/Invoice';

export class InvoiceRepository implements IInvoiceRepository {

    private ormRepository: Repository<Invoice>;

    constructor() {
        this.ormRepository = getRepository(Invoice)
    }

    public async findByNumber(nfNumber: string): Promise<Invoice> {
        const all = await this.ormRepository.findOne({ relations: ['company'], where: { nfNumber } });
        return all;
    }
    public async findFaturationInYear(year: number): Promise<number> {
        const { sum } = await this.ormRepository
            .createQueryBuilder("Invoice")
            .select("SUM(Invoice.amount)", "sum")
            .where("Invoice.competence like :year", { year: `%${year}` })
            .getRawOne();

        return sum || 0;
    }
    public async findByCompetence(competence: string): Promise<Invoice[]> {
        const all = await this.ormRepository.find({ relations: ['company'], where: { competence } });
        return all;
    }

    public async findByCompetenceYear(competenceYear: string): Promise<Invoice[]> {
        const all = await this.ormRepository.find({ relations: ['company'], where: { competence: ILike(`%/${competenceYear}`) } });
        return all;
    }

    public async findDataMontlyInvoicesGrouppedByCompetence(year: number): Promise<any> {

        const data = await this.ormRepository.query(
            `SELECT inv.competence AS month, 
                SUM(inv.amount) AS sum 
            FROM tb_invoice inv 
            WHERE ( inv.competence like '%/${year}' ) 
                AND (inv.deleted_at IS NULL) 
            GROUP BY inv.competence`);

        return data;
    };
    public async findDataMontlyInvoicesGrouppedByPaymentDate(year: number): Promise<any> {
        const data = await this.ormRepository.query(
            `SELECT CONCAT(SUBSTRING(inv.receipt_date,6,2),'/',SUBSTRING(inv.receipt_date,1,4)) as month, 
                SUM(inv.amount) AS sum 
            FROM tb_invoice inv 
            WHERE ( inv.receipt_date like '${year}-%' ) 
                AND (inv.deleted_at IS NULL) 
            GROUP BY SUBSTRING(inv.receipt_date,1,7)`);

        return data;
    };

    public async findByID(id: number): Promise<Invoice> {
        const all = await this.ormRepository.findOne({ relations: ['company'], where: { id } });
        return all;
    };

    public async findAll(): Promise<Array<Invoice>> {
        const all = await this.ormRepository.find({ relations: ['company'] });
        return all;
    }

    public async create(data: ICreateInvoiceDTO): Promise<Invoice> {
        const invoice = this.ormRepository.create(data);
        await this.ormRepository.save(invoice);
        return invoice;
    }
    public async update({ amount, competence, description, idCompany, nfNumber, receiptDate, id }: IUpdateInvoiceDTO): Promise<Invoice> {
        const invoice = await this.ormRepository.findOne({ where: { id } });
        Object.assign(invoice, { amount, competence, description, idCompany, nfNumber, receiptDate });
        await this.ormRepository.save(invoice);
        return invoice;
    }

    public async delete(id: number): Promise<void> {
        await this.ormRepository.softDelete(id);
        return;
    }


};
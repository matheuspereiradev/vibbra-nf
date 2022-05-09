import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "../../../company/models/entities/Company";

@Entity("tb_invoice")
export class Invoice {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @Column({ name: 'nf_number' })
    nfNumber: string;

    @Column()
    description: string;

    @Column()
    competence: string;

    @Column({ name: 'receipt_date' })
    receiptDate: Date;

    @Column({ name: 'id_company' })
    idCompany: number;

    @OneToOne(_type => Company, comp => comp.id)
    @JoinColumn({ name: 'id_company' })
    company: Company;

    @CreateDateColumn()
    created_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}
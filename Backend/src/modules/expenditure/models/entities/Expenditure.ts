import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "../../../company/models/entities/Company";
import { ExpenditureCategory } from "./ExpenditureCategory";

@Entity("tb_expenditure")
export class Expenditure {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @Column()
    description: string;

    @Column()
    competence: string;

    @Column({ name: "payment_date" })
    paymentDate: Date;

    @Column({ name: "id_company" })
    idCompany: number;

    @Column({ name: "id_category" })
    idCategory: number;

    @OneToOne(_type => Company, comp => comp.id)
    @JoinColumn({ name: "id_company" })
    company: Company;

    @OneToOne(_type => ExpenditureCategory, cat => cat.id)
    @JoinColumn({ name: "id_category" })
    category: ExpenditureCategory;

    @CreateDateColumn()
    created_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}
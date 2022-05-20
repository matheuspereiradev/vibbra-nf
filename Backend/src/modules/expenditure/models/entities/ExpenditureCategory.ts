import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "../../../company/models/entities/Company";

@Entity("tb_expenditure_category")
export class ExpenditureCategory {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ name: "id_company" })
    idCompany: number;

    @OneToOne(_type => Company, comp => comp.id)
    @JoinColumn({ name: "id_company" })
    company: Company;

    @CreateDateColumn()
    created_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}
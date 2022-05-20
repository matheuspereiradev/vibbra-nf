import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "../../../company/models/entities/Company";
import { Provider } from "../../../provider/models/entities/Provider";
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

    @Column({ name: "id_provider" })
    idProvider: number;

    @OneToOne(_type => Provider, pro => pro.id)
    @JoinColumn({ name: "id_provider" })
    provider: Provider;

    @CreateDateColumn()
    created_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}
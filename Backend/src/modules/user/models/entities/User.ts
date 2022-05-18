import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "../../../company/models/entities/Company";
@Entity("tb_user")
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ name: "id_company" })
    idCompany: string;

    @Column({ name: "is_owner" })
    isOwner: boolean;

    @OneToOne(_type => Company, com => com.id)
    @JoinColumn({ name: "id_company" })
    company: Company;

    @CreateDateColumn()
    created_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}

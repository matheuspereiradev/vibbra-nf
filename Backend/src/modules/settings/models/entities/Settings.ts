import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "../../../company/models/entities/Company";

@Entity("tb_settings")
export class Settings {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "send_email_billing_alerts" })
    sendEmailBillingAlerts: boolean;

    @Column({ name: "notify_from" })
    notifyFrom: number;

    @Column({ name: 'email_billing_alerts' })
    emailBillingAlerts: string;

    @Column({ name: 'maximum_annual_billing_limit' })
    maximumAnnualBillingLimit: number;

    @Column({ name: "id_company" })
    idCompany: string;

    @OneToOne(_type => Company, com => com.id)
    @JoinColumn({ name: "id_company" })
    company: Company;

}
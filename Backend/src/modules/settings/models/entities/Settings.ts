import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

}
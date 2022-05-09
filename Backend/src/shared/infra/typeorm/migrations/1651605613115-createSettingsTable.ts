import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createSettingsTable1651605613115 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "tb_settings",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "send_email_billing_alerts",
                    type: "tinyint"
                },
                {
                    name: "email_billing_alerts",
                    type: "varchar",
                    length: "50"
                },
                {
                    name: "maximum_annual_billing_limit",
                    type: "decimal(10,2)"
                },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable("tb_settings");
    }

}

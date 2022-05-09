import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createTableExpediturecategory1651600134725 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "tb_expenditure_category",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "name",
                    type: "varchar",
                    length: "40"
                },
                {
                    name: "description",
                    type: "text"
                },
                {
                    name: "deleted_at",
                    type: "timestamp",
                    isNullable: true
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP"
                }
            ],

        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable("tb_expenditure_category");
    }

}

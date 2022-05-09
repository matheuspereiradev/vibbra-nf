import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createTableCompanies1651537880947 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "tb_companies",
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
                    length: "45"
                },
                {
                    name: "corporate_name",
                    type: "varchar",
                    length: "45"
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
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable("tb_companies");
    }

}

import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createExpenditureTable1651594756313 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "tb_expenditure",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "amount",
                    type: "DECIMAL(8,2)"
                },
                {
                    name: "description",
                    type: "text"
                },
                {
                    name: "competence",
                    type: "varchar",
                    length: "7"
                },
                {
                    name: "payment_date",
                    type: "timestamp"
                },
                {
                    name: "id_company",
                    type: "int",
                    isNullable: true
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
            foreignKeys: [
                {
                    name: "fk_expediture_company",
                    referencedTableName: "tb_companies",
                    referencedColumnNames: ["id"],
                    columnNames: ["id_company"],
                    onUpdate: "CASCADE"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable("tb_expenditure");
    }

}

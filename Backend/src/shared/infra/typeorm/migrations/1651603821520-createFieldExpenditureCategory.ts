import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class createFieldExpenditureCategory1651603821520 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("tb_expenditure",
            new TableColumn(
                {
                    name: "id_category",
                    type: "int"
                })
        );
        await queryRunner.createForeignKey("tb_expenditure", new TableForeignKey({
            name: "fk_expenditure_category",
            referencedTableName: "tb_expenditure_category",
            referencedColumnNames: ["id"],
            columnNames: ["id_category"],
            onUpdate: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("tb_expenditure", "fk_expenditure_category");
        await queryRunner.dropColumn("tb_expenditure", "id_category");
    }

}

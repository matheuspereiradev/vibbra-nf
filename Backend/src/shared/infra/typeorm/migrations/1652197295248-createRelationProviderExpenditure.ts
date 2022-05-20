import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class createRelationProviderExpenditure1652197295248 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("tb_expenditure",
            new TableColumn(
                {
                    name: "id_provider",
                    type: "int",
                    isNullable: true,
                })
        );
        await queryRunner.createForeignKey("tb_expenditure", new TableForeignKey({
            name: "fk_expenditure_provider",
            referencedTableName: "tb_provider",
            referencedColumnNames: ["id"],
            columnNames: ["id_provider"],
            onUpdate: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("tb_expenditure", "fk_expenditure_provider");
        await queryRunner.dropColumn("tb_expenditure", "id_provider");
    }

}

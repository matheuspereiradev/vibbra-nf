import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class createrelationCategoryWithCompany1652136499098 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("tb_expenditure_category",
            new TableColumn(
                {
                    name: "id_company",
                    type: "int",
                    isNullable: true,
                })
        );
        await queryRunner.createForeignKey("tb_expenditure_category", new TableForeignKey({
            name: "fk_company_category",
            referencedTableName: "tb_companies",
            referencedColumnNames: ["id"],
            columnNames: ["id_company"],
            onUpdate: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("tb_expenditure_category", "fk_company_category");
        await queryRunner.dropColumn("tb_expenditure_category", "id_company");
    }

}

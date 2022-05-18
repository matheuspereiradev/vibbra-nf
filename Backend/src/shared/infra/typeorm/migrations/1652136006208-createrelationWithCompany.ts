import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class createrelationWithCompany1652136006208 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("tb_settings",
            new TableColumn(
                {
                    name: "id_company",
                    type: "int",
                    isNullable: true
                })
        );
        await queryRunner.createForeignKey("tb_settings", new TableForeignKey({
            name: "fk_company_settings",
            referencedTableName: "tb_companies",
            referencedColumnNames: ["id"],
            columnNames: ["id_company"],
            onUpdate: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("tb_settings", "fk_company_settings");
        await queryRunner.dropColumn("tb_settings", "id_company");
    }

}

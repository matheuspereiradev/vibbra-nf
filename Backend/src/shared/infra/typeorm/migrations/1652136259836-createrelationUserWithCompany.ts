import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class createrelationUserWithCompany1652136259836 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("tb_user",
            new TableColumn(
                {
                    name: "id_company",
                    type: "int",
                    isNullable: true
                })
        );
        await queryRunner.createForeignKey("tb_user", new TableForeignKey({
            name: "fk_company_user",
            referencedTableName: "tb_companies",
            referencedColumnNames: ["id"],
            columnNames: ["id_company"],
            onUpdate: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("tb_user", "fk_company_user");
        await queryRunner.dropColumn("tb_user", "id_company");
    }


}

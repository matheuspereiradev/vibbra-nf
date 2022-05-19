import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class createIdCompanyInProvider1652970922674 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("tb_provider",
            new TableColumn(
                {
                    name: "id_company",
                    type: "int"
                })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("tb_provider", "id_company");
    }

}

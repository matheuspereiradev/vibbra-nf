import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class createFieldCNPJ1651538873206 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('tb_companies',
            new TableColumn(
                {
                    name: 'cnpj',
                    type: "varchar",
                    length: "30"
                })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('tb_companies', 'CNPJ');
    }

}

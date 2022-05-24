import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class menasureunit1653338213519 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "tb_meansure_unit",
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
                    name: "abbreviation",
                    type: "varchar",
                    length: "45",
                },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tb_meansure_unit");
    }

}

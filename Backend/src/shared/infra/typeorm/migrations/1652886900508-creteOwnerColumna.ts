import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class creteOwnerColumna1652886900508 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("tb_user",
            new TableColumn(
                {
                    name: "is_owner",
                    type: "tinyint",
                    default: 0
                })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("tb_user", "is_owner");
    }

}

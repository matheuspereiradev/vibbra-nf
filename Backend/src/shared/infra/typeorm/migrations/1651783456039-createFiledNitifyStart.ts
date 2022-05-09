import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class createFiledNitifyStart1651783456039 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("tb_settings",
            new TableColumn(
                {
                    name: "notify_from",
                    type: "decimal(8,2)",
                })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("tb_settings", "notify_from");
    }

}

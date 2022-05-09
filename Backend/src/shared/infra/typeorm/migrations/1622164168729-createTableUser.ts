import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createTableUser1622164168729 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "tb_user",
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
                    name: "surname",
                    type: "varchar",
                    length: "45"
                },
                {
                    name: "email",
                    type: "varchar",
                    length: "50"
                },
                {
                    name: "password",
                    type: "varchar",
                    length: "140"
                },
                {
                    name: "deleted_at",
                    type: "timestamp",
                    isNullable: true
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable("tb_user");
    }

}

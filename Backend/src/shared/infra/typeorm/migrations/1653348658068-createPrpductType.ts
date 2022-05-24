import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class createPrpductType1653348658068 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "tb_product_type",
            columns: [
                {
                    name: "id",
                    isPrimary: true,
                    type: "varchar",
                    length: "45"
                    
                },
                {
                    name: "name",
                    type: "varchar",
                    length: "45"
                },
            ]
        }));
        await queryRunner.addColumn("tb_products",
            new TableColumn(
                {
                    name: "id_product_type",
                    type: "varchar",
                    length: "45",
                    isNullable: true,
                })
        );
        await queryRunner.createForeignKey("tb_products", new TableForeignKey({
            name: "fk_product_type",
            referencedTableName: "tb_product_type",
            referencedColumnNames: ["id"],
            columnNames: ["id_product_type"],
            onUpdate: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tb_product_type");
        await queryRunner.dropForeignKey("tb_products", "fk_product_type");
        await queryRunner.dropColumn("tb_products", "id_product_type");
    }

}

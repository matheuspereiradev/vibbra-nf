import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createTableProdut1653092266974 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "tb_products",
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
                    name: "product_brand",
                    type: "varchar",
                    length: "45",
                    isNullable: true
                },
                {
                    name: "barcode",
                    type: "varchar",
                    length: "120",
                    isNullable: true
                },
                {
                    name: "type",
                    type: "varchar",
                    length: "5"
                },
                {
                    name: "details",
                    type: "text",
                    isNullable: true
                },
                {
                    name: "id_company",
                    type: "int"
                },
                {
                    name: "purchase_price",
                    type: "DECIMAL(8,2)",
                    default: 0
                },
                {
                    name: "sale_price",
                    type: "DECIMAL(8,2)",
                    default: 0
                },
                {
                    name: "stock_min",
                    type: "DECIMAL(8,2)",
                    default: 0
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
        await queryRunner.dropTable("tb_products");
    }

}

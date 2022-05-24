import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class menasureunitProductrelation1653338332878 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("tb_products",
            new TableColumn(
                {
                    name: "id_meansure_unit",
                    type: "int",
                    isNullable: true,
                })
        );
        await queryRunner.createForeignKey("tb_products", new TableForeignKey({
            name: "fk_product_um",
            referencedTableName: "tb_meansure_unit",
            referencedColumnNames: ["id"],
            columnNames: ["id_meansure_unit"],
            onUpdate: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("tb_products", "fk_product_um");
        await queryRunner.dropColumn("tb_products", "id_meansure_unit");
    }

}

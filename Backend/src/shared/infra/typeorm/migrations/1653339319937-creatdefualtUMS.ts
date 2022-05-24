import { MigrationInterface, QueryRunner } from "typeorm";

export class creatdefualtUMS1653339319937 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO tb_meansure_unit (name,abbreviation) values
                                        ('quilograma','KG'),
                                        ('miligrama','MG'),
                                        ('grama','G'),
                                        ('litro ','L'),
                                        ('mililitro','ML'),
                                        ('quilolitro','KL'),
                                        ('centímetro','CM'),
                                        ('quilômetro ','KM'),
                                        ('milímetro','MM'),
                                        ('metro ','M')`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM tb_meansure_unit WHERE abbreviation in ('KG','MG','G','L','ML','KL','CM','KM','MM','M')`)                                  
    }

}

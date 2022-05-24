import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("tb_product_type")
export class ProductType {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

}
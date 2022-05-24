import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MeansureUnit } from "../../../meansureUnit/models/entities/MeansureUnit";
import { ProductType } from "./ProductType";

@Entity("tb_products")
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ name: 'id_product_type' })
    idType: string;

    @OneToOne(_type => ProductType, pt => pt.id)
    @JoinColumn({ name: "id_product_type" })
    type: ProductType;

    @Column({ name: 'id_meansure_unit' })
    idMeansureUnit: number;

    @OneToOne(_type => MeansureUnit, um => um.id)
    @JoinColumn({ name: "id_meansure_unit" })
    meansureUnit: MeansureUnit;

    @Column({ name: 'stock_min' })
    stockMin: number;

    @Column({ name: 'product_brand' })
    brandProduct: string;

    @Column({ name: 'purchase_price' })
    purchasePrice: number;

    @Column({ name: 'sale_price' })
    salePrice: number;

    @Column({ name: 'id_company' })
    idCompany: number;

    @Column()
    barcode: string;

    @Column()
    details: string;

    @CreateDateColumn()
    created_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}
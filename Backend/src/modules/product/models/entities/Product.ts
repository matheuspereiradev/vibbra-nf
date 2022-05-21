import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tb_products")
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

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
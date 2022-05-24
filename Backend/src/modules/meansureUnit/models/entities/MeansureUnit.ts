import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tb_meansure_unit")
export class MeansureUnit {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    abbreviation: string;

}
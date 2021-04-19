import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TimestampEntity } from "./timestamp-entity";

@Entity('livreur')
export class livreurEntity extends TimestampEntity{
    @PrimaryGeneratedColumn("uuid")
    id: number;
    @Column({type: 'varchar', length: 50})
    prenom: string;
    @Column({type: 'varchar', length: 50})
    nom: string;
    @Column({type: 'varchar'})
     sexe: string;
     @Column({type: 'varchar'})
      adresse: string;
      @Column({})
        cin: number;
        @Column({type: 'varchar'})
       role: string;
     @Column({})
       age: number;
    @Column({type: 'varchar', unique:true})
      email: string;
    @Column({type: 'varchar'})
    password: string;

    



}










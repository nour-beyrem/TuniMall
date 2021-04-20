import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TimestampEntity } from "./timestamp-entity";


@Entity('client')
export class clientEntity extends TimestampEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;
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
     @Column({})
       age: number;
    @Column({type: 'varchar', unique:true})
      email: string;
    @Column({type: 'varchar'})
    password: string;







}
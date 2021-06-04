
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { TimestampEntity } from "./timestamp-entity";
import { produitEntity } from './produit.entity';

@Entity('shop')
export class shopEntity extends TimestampEntity{
    
    @PrimaryColumn({ unique:true})
    nom: string;
    @Column({type: 'varchar'})
    path: string;

    @Column({type: 'varchar'})
       image: string;
 


    @OneToMany(type=>produitEntity, (produit) =>produit.shop,{
        cascade: true,
    })
        produits: shopEntity[]; 
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   







}

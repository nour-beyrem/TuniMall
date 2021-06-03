import { produitEntity } from './produit.entity';

import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TimestampEntity } from "./timestamp-entity";

import { adminEntity } from './admin.entity';

@Entity('livraison')
export class livraisonEntity extends TimestampEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({})
    cout: number;
    @Column({type: 'varchar'})
    adresse: string;
    @Column({type: 'varchar'})
    email: string;
    @Column({type: 'varchar'})
    nom: string;
    @Column({type: 'varchar'})
   prenom: string;

   @Column({})
   cin: number;

    @Column({type: 'boolean'})
    approuver: boolean;

    @Column({type: 'boolean'})
    terminer: boolean;

    @ManyToOne(type => adminEntity, (livreur)=> livreur.livraisons,  {
        
        nullable: true ,  eager: true
      })
    livreur: adminEntity; 

    @ManyToOne( type=>produitEntity, (produit)=> produit.livraisons, {
        nullable: true ,  eager: true
    })
    produit: produitEntity;


}

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

    @Column({type: 'boolean'})
    approuver: boolean;

    @Column({type: 'boolean'})
    terminer: boolean;

    @ManyToOne(type => adminEntity, (livreur)=> livreur.livraisons,  {
        
        nullable: true ,  eager: true
      })
    livreur: adminEntity; 

    @ManyToOne( type=>adminEntity, (client)=> client.livraisons, {
        nullable: true ,  eager: true
    })
    client: adminEntity;

    @ManyToMany(type => produitEntity)
    @JoinTable({
        name: 'panier',
        joinColumn: { name: 'livraison_id', referencedColumnName: 'id'},
        inverseJoinColumn: { name: 'produit_id', referencedColumnName: 'codeBar'},
    })
    panier: produitEntity [];
   

}

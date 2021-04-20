import { produitEntity } from './produit.entity';
import { livreurEntity } from './livreur.entity';
import { type } from "node:os";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TimestampEntity } from "./timestamp-entity";
import { clientEntity } from './client.entity';

@Entity('livraison')
export class livraisonEntity extends TimestampEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({})
    cout: number;
    @Column({type: 'varchar'})
    adresse: string;

    @ManyToOne(type => livreurEntity)
    livreur: livreurEntity; 

    @ManyToOne( type=>clientEntity)
    client: clientEntity;

    @ManyToMany(type => produitEntity)
    @JoinTable({
        name: 'panier',
        joinColumn: { name: 'livraison_id', referencedColumnName: 'id'},
        inverseJoinColumn: { name: 'produit_id', referencedColumnName: 'codeBar'},
    })
    panier: produitEntity [];
   

}

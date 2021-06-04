import { shopEntity } from './shop.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { TimestampEntity } from "./timestamp-entity";
import { livraisonEntity } from './livraison.entity';

@Entity('produit')
export class produitEntity extends TimestampEntity{
    
    @PrimaryColumn({ unique:true})
    codeBar: string;
   
    @Column({type: 'varchar', length: 50})
    nom: string;
    @Column({type: 'varchar'})
     type: string;
    @Column({type: 'varchar'})
      categorie: string;
    @Column({})
        price: number;
    @Column({type: 'varchar'})
       couleur: string;
    @Column({})
       quantite: number;

    @Column({type: 'varchar'})
      image: string;
    
    
    
   
      @ManyToOne( type=>shopEntity, (shop)=> shop.produits,
      {
        
        nullable: true,  eager: true
       
      })
       shop: shopEntity;


       @OneToMany( type=>livraisonEntity, (livraison)=> livraison.produit, {
        nullable: true 
    })
      livraisons: produitEntity[];
   





}










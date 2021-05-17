import { shopEntity } from './shop.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { TimestampEntity } from "./timestamp-entity";

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
      marque: string;
   
      @ManyToOne( type=>shopEntity, (shop)=> shop.produits,
      {
        
        nullable: true,  eager: true
       
      })
       shop: shopEntity;
   





}










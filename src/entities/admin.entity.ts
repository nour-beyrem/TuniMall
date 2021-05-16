
import { UserRoleEnum } from "src/enums/user-role.enum";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { livraisonEntity } from "./livraison.entity";
import { TimestampEntity } from "./timestamp-entity";

@Entity('user')
export class adminEntity extends TimestampEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({type: 'varchar', length: 50})
    prenom: string;
    @Column({type: 'varchar', length: 50})
    nom: string;
    @Column({type: 'varchar', nullable: true})
     sexe: string;
    @Column({type: 'varchar', nullable: true})
      adresse: string;
    @Column({})
        cin: number;
    @Column({type: 'enum',
        enum: UserRoleEnum})
       role: string;

       @Column({
        length: 50,
        unique: true
      })
      username: string;  
     
    @Column({type: 'varchar', unique:true})
      email: string;
    @Column({type: 'varchar'})
    password: string;

    @Column({type: 'varchar'})
    salt: string;

   @OneToMany(type=>livraisonEntity, (livraison) =>livraison.livreur,  {
    nullable: true
  })
    livraisons: livraisonEntity[]; 




}















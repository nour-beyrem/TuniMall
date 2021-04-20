import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { clientEntity } from "./client.entity";
import { TimestampEntity } from "./timestamp-entity";

@Entity('complain')
export class complainEntity extends TimestampEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({type: 'varchar'})
    sujet: string;
    @Column({type: 'varchar'})
    description: string;
   
   @ManyToOne(type => clientEntity)
    client: clientEntity;
}










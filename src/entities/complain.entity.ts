import { ComplainTypeEnum } from './../enums/complain-type.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { adminEntity } from "./admin.entity";

import { TimestampEntity } from "./timestamp-entity";

@Entity('complain')
export class complainEntity extends TimestampEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({type: 'enum',
    enum: ComplainTypeEnum})
    sujet: string;
    @Column({type: 'varchar'})
    reclamation: string;

    @Column({type: 'varchar'})
    reponse: string;
   
   @ManyToOne(type => adminEntity)
    client: adminEntity;
}










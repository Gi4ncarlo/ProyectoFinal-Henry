import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
@Entity()
export class ServiceProvidedEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()
    @Column()
    detailService: string
    @Column()
    price: string
    @Column({
        type: 'simple-array',
    })
    categories: string[]
    // @ManyToOne(() => Gardener, (gardener) => gardener.serviceProvided)
    // @JoinColumn()
    // assignedGardener: Gardener[];

}
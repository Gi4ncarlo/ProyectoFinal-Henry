import { Gardener } from "src/modules/gardener/entities/gardener.entity";
import { ServicesOrderEntity } from "src/modules/services-order/entities/services-order.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Categories } from "../enums/categories.enum";
@Entity()
export class ServiceProvided {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column()
    detailService: string

    @Column()
    price: number

    @Column({
        type: 'simple-array',
    })

    @Column({
        type: 'enum',
        enum: Categories,
        default: Categories.GROWER
      })
      categories: Categories[];


    @ManyToMany(() => Gardener, (gardener) => gardener.serviceProvided, { onDelete: "CASCADE" })
    gardener: Gardener[];

    @OneToMany(() => User, (user) => user.serviceProvided, { onDelete: "CASCADE" })
    user: User

    @OneToOne(() => ServicesOrderEntity, (serviceOrder) => serviceOrder.serviceProvided, { onDelete: "CASCADE" })
    serviceOrder: ServicesOrderEntity
}




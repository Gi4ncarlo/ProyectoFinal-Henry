import { ServiceDetail } from "src/modules/service-details/entities/service-detail.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, JoinColumn, OneToMany } from "typeorm";
import { v4 as uuid } from 'uuid';
import { User } from "src/modules/user/entities/user.entity";
import { ServiceProvided } from "src/modules/serviceProvided/entities/serviceProvided.entity";
import { Gardener } from "src/modules/gardener/entities/gardener.entity";

@Entity({ name: "service_order" })
export class ServicesOrderEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column()
    date: string;

    @Column({ default: false })
    isApproved: boolean;

    // Relación con la entidad ServiceDetail (1:1)
    @OneToOne(() => ServiceDetail, (serviceDetail) => serviceDetail.servicesOrder, { onDelete: "CASCADE" })
    @JoinColumn()
    orderDetail: ServiceDetail;
    // // Relación con la entidad ServiceDetail (1:1)
    @OneToMany(() => ServiceProvided, (serviceProvided) => serviceProvided.serviceOrder, { onDelete: "CASCADE" })
    @JoinColumn()
    serviceProvided: ServiceProvided[];

    // Relación con la entidad Gardener (Muchos a Uno)
    @ManyToOne(() => Gardener, (gardener) => gardener.servicesOrder)
    @JoinColumn()
    gardener: Gardener;

    // Relación con la entidad User (Muchos a Uno)
    @ManyToOne(() => User, (user) => user.servicesOrder)
    @JoinColumn()
    user: User;
}
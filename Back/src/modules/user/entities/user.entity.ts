import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Role } from '../enums/role.enum';
import { ServicesOrderEntity } from 'src/modules/services-order/entities/services-order.entity';
import { ServiceProvided } from 'src/modules/serviceProvided/entities/serviceProvided.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  age: number;

  @Column()
  phone: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User
  })
  role: Role;

  @OneToMany(() => ServicesOrderEntity, (serviceOrders) => serviceOrders.user)
  servicesOrder: ServicesOrderEntity;

  @ManyToOne(() => ServiceProvided, (serviceProvided) => serviceProvided.user)
  serviceProvided: ServiceProvided;
}

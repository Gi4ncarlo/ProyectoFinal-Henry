import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Role } from '../enums/role.enum';
import { ServicesOrderEntity } from 'src/modules/services-order/entities/services-order.entity';
import { ServiceProvided } from 'src/modules/serviceProvided/entities/serviceProvided.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column()
  username: string;

  @Column({ nullable: false })
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

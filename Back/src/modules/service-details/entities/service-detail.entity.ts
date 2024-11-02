import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({
  name: 'serviceDetails',
})
export class ServiceDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  //   @OneToOne(() => Order, (order) => order.orderDetail, { onDelete: 'CASCADE' })
  //   @JoinColumn()
  //     order : Order;

  @Column()
  serviceType: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @Column({ type: 'timestamp', nullable: true })
  startTime: Date;

  @Column({ type: 'timestamp', nullable: true })
  endTime: Date;

  @Column({ default: 'Pendiente' })
  status: string;

  @Column({ type: 'int', nullable: true })
  rating: number; // Calificación entre 0 y 5
  

// @ManyToOne(() => Gardener, (gardener) => gardener.serviceDetails, { nullable: false })
// @JoinColumn()
// assignedGardener: Gardener;

}

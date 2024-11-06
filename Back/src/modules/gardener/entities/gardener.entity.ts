import { ServiceProvided } from 'src/modules/serviceProvided/entities/serviceProvided.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({
  name: 'Gardener',
})
export class Gardener {
  //extends User (agregarlo)
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'text', nullable: true })
  name: string; // Nombre del jardinero

  @Column({ type: 'text', nullable: true })
  experience: string; // Años de experiencia o descripción breve

  @Column({ type: 'int', nullable: true })
  calification: number; // Calificación promedio basada en servicios

  @Column({ nullable: true })
  ubication: string; //REVISAR QUE TIPO DE DATO DEVUELVE GOOGLE MAPS PARA LA UBI

  @Column({ type: 'float', nullable: true })
  costPerHour: number;

  @ManyToMany(() => ServiceProvided, (service) => service.gardener)
  @JoinTable()
  serviceProvided: ServiceProvided[];

  @Column({ type: 'text', nullable: true })
  profileImageUrl: string;
}

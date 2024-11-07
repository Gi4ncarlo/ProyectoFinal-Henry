import { ServiceProvided } from 'src/modules/serviceProvided/entities/serviceProvided.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Role } from 'src/modules/user/enums/role.enum';
import {
  Column,
  Entity,
  ManyToMany,
} from 'typeorm';

@Entity({
  name: 'Gardener',
})
export class Gardener extends User{

  @Column({ type: 'text', nullable: true })
  experience: string; // Años de experiencia o descripción breve

  @Column({ type: 'int', nullable: true })
  calification: number; // Calificación promedio basada en servicios

  @Column({ nullable: true })
  ubication: string; //REVISAR QUE TIPO DE DATO DEVUELVE GOOGLE MAPS PARA LA UBI

  @Column({ type: 'float', nullable: true })
  costPerHour: number;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Gardener
  })
  role: Role;

  @ManyToMany(() => ServiceProvided, (service) => service.gardener)
  serviceProvided: ServiceProvided[];

}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Role } from '../enums/role.enum';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;
  
  @Column()
  age: number;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User
  })
  role: Role;
}

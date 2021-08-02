//este archivo nos sirve para crear las entidades dentro de nuestra base de datos y nos crea las tablas automaticamente
import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";
import { MinLength, IsNotEmpty, IsEmail } from "class-validator";
 import * as bcrypt from "bcryptjs"

@Entity()
@Unique(['email'])

export class Usuario {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @MinLength(6)
  password: string;

  @Column()
  @IsNotEmpty()
  role: string;

  hashPassword(): void {
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
  }

  checkPassword(password: string): boolean {
  return bcrypt.compareSync(password, this.password);
  }


}
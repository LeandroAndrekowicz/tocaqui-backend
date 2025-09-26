import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PersonEntity } from "src/person/models/entities/person.entity";

@Entity({ name: "credential" })
export class CredentialEntity {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: number;

  @Column({ name: "password", type: "character varying", length: 60, nullable: false })
  password: string;

  @Column({ name: "activation_token", type: "character varying", length: 255, nullable: true })
  activationToken?: string;

  @Column({ name: "recovery_token", type: "character varying", length: 255, nullable: true })
  recoveryToken?: string;

  @ManyToOne(() => PersonEntity, person => person.credentials, { onDelete: "CASCADE" })
  @JoinColumn({ name: "person_id" })
  person: PersonEntity;
}

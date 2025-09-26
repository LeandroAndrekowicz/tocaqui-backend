import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AuthorityEnum } from "../enums/authority.enum";
import { PersonEntity } from "src/person/models/entities/person.entity";

@Entity({ name: 'authority' })
export class AuthorityEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ name: 'permission', type: 'enum', enum: AuthorityEnum, default: AuthorityEnum.STUDENT, nullable: false })
    permission: AuthorityEnum;

    @ManyToOne(() => PersonEntity, person => person.authorities, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'person_id' })
    person: PersonEntity;
}
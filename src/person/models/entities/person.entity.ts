import { CredentialEntity } from "src/credential/models/entities/credential.entity";
import { UserSessionEntity } from "src/user-session/models/entities/user-session.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "person" })
export class PersonEntity {
    @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
    id: number;

    @Column({ name: "name", type: "character varying", length: 100, nullable: false })
    name: string;

    @Column({ name: "email", type: "character varying", length: 100, nullable: false, unique: true })
    email: string;

    @Column({ name: "mobile_number", type: "character varying", length: 15, nullable: false, unique: true })
    mobileNumber: string;

    @Column({ name: "cpf", type: "character varying", length: 11, nullable: false, unique: true })
    cpf: string;

    @Column({ name: "profile_picture", type: "character varying", length: 255, nullable: true })
    profilePicture: string

    @OneToMany(() => UserSessionEntity, userSession => userSession.person)
    userSessions: UserSessionEntity[];

    @OneToMany(() => CredentialEntity, credential => credential.person)
    credentials: CredentialEntity[];
}
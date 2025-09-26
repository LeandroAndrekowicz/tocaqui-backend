import { PersonEntity } from "src/person/models/entities/person.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "user_session" })
export class UserSessionEntity {
    @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
    id: number;

    @Column({ name: "ip_address", type: "bigint", nullable: false })
    ipAddress: string;

    @Column({ name: "access_token", type: "character varying", length: 255, nullable: false })
    accessToken: string;

    @Column({ name: "refresh_token", type: "character varying", length: 255, nullable: false })
    refreshToken: string;

    @Column({ name: "login_date", type: "timestamptz", nullable: false, default: () => "CURRENT_TIMESTAMP" })
    loginDate: Date;

    @Column({ name: "logout_date", type: "timestamptz", nullable: true })
    logoutDate: Date;

    @ManyToOne(() => PersonEntity, person => person.id, { nullable: false })
    @JoinColumn({ name: "person_id" })
    person: PersonEntity;
}
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  logo: string;

  @Column()
  teamClass: string;

  @Column()
  record: string;

  @Column()
  winningPer: string;

  @Column()
  winningStreak: number;

  @Column()
  loosingStreak: number;
}

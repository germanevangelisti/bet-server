import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Bet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  totalStake: number;

  @Column()
  totalReturns: number;

  @Column()
  creationDate: string;

  @Column()
  createdBy: string;
}

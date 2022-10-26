import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Season {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  season: number;

  @Column()
  startYear: number;

  @Column()
  endYear: number;

  @Column()
  description: string;

  @Column()
  regularSeasonStartDate: string;

  @Column()
  postSeasonStartDate: string;

  @Column()
  seasonType: string;

  @Column()
  apiSeason: string;
}

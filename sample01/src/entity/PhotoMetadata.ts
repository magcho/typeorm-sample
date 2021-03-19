import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Photo } from "./Photo";

@Entity()
export class PhotoMetadata {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @OneToOne((type) => Photo)
  @JoinColumn()
  photo: Photo;

  @Column("int")
  height: number;

  @Column()
  comment: string;
}

import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

export enum StatusEnum {
  ACTIVE = 0,
  STOP = 1,
  PENDING = 2,
}

@Entity({ name: 'user' })
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45 })
  email: string;

  @Column({ nullable: true })
  nickname: string;

  @Column({ length: 100 })
  @Exclude()
  password: string;

  @Column({ nullable: true, length: 20 })
  name: string;

  @Column({ type: 'int', enum: StatusEnum })
  status: StatusEnum;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdTime: Date;

  @UpdateDateColumn()
  updatedTime: Date;

  @OneToMany((type) => Photo, (photo) => photo.user, { cascade: ['insert', 'update'] })
  photos: Photo[];

  @Expose()
  get nameNickname(): string {
    return `${this.name} ${this.nickname}`;
  }
}

@Entity({ name: 'user_photo' })
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  url: string;

  @ManyToOne((type) => User, (user) => user.photos, { nullable: false, onDelete: 'CASCADE' })
  user: User;
}

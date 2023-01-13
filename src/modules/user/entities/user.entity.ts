import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum StatusEnum {
  ACTIVE = 0,
  STOP = 1,
  PENDING = 2,
}

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45 })
  email: string;

  @Column({ nullable: true })
  nickname: string;

  @Column({ length: 100 })
  password: string;

  @Column({ nullable: true, length: 20 })
  name: string;

  @Column({ type: 'int', enum: StatusEnum })
  status: StatusEnum;

  @CreateDateColumn()
  createdTime: Date;

  @UpdateDateColumn()
  updatedTime: Date;

  @OneToMany((type) => Photo, (photo) => photo.user, { cascade: ['insert', 'update'] })
  photos: Photo[];
}

@Entity({ name: 'user_photo' })
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  url: string;

  @ManyToOne((type) => User, (user) => user.photos)
  user: User;
}

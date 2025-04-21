import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { TaskEntity } from '../task/task.entity';

@Entity()
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => TaskEntity, (task) => task.tags)
  tasks: TaskEntity[];
}

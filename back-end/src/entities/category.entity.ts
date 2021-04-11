import { IsNumber } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { JoinColumn, ManyToMany } from 'typeorm/index';

@Entity({ name: 'categories' })
@Tree('materialized-path')
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Unique(['slug'])
  @Column()
  slug: string;

  @Column()
  title: string;

  @Column()
  color: string

  @TreeParent()
  parent: CategoryEntity;

  @TreeChildren()
  children: CategoryEntity[];

  @Column()
  @IsNumber({}, { message: 'Incorrect value' })
  position: number;

  @Column({ name: 'is_searchable' })
  @IsNumber({}, { message: 'Incorrect value' })
  is_searchable: number;

  @Column({ name: 'is_active' })
  @IsNumber({}, { message: 'Incorrect value' })
  is_active: number;

  @CreateDateColumn({
    nullable: true,
    name: 'created_at',
  })
  created_at: Date;

  @UpdateDateColumn({
    nullable: true,
    name: 'updated_at',
  })
  updated_at: Date;

  @ManyToMany(type => CategoryEntity, { cascade: true })
  @JoinColumn({
    name: 'id',
  })
  category: CategoryEntity[];

  constructor(partial: Partial<CategoryEntity>) {
    super();
    Object.assign(this, partial);
  }
}

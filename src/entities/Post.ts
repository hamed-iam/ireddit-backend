import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ObjectType } from 'type-graphql';

// ***** id, createdAt, updatedAt,title are columns *****
@ObjectType()
@Entity()
export class Post {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: 'date' })
  createdAt: Date = new Date(); //standard field

  @Field(() => String)
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt: Date = new Date(); //standard field

  @Field()
  @Property({ type: 'text' })
  title!: string; //standard field
}

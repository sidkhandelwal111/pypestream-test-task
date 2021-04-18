import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TopicDocument = Topic & Document;

@Schema()
export class Topic {
  @Prop()
  name: string;

  @Prop([String])
  subscribers: [string];

  @Prop([String])
  messages: [string];
}

export const TopicSchema = SchemaFactory.createForClass(Topic);
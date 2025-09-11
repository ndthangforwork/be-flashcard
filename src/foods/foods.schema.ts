import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FoodsDocument = HydratedDocument<Foods>;

@Schema({ timestamps: true })
export class Foods {
  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, required: true })
  imageUrl!: string;
}

export const FoodsSchema = SchemaFactory.createForClass(Foods);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FlashcardDocument = HydratedDocument<Flashcard>;

// Subdocument cho Card
class Card {
  @Prop({ type: String, required: true })
  front!: string;

  @Prop({ type: String, required: true })
  back!: string;
}

@Schema({ timestamps: true })
export class Flashcard {
  @Prop({ type: String, required: true })
  name!: string;

  tag!: string[];

  @Prop({ type: [{ front: String, back: String }], default: [] })
  cards!: Card[];
}

export const FlashcardSchema = SchemaFactory.createForClass(Flashcard);

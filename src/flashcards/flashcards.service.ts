import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Flashcard, FlashcardDocument } from './flashcards.schema';

@Injectable()
export class FlashcardsService {
  constructor(
    @InjectModel(Flashcard.name)
    private flashcardModel: Model<FlashcardDocument>,
  ) {}

  async findAll(): Promise<Flashcard[]> {
    return await this.flashcardModel.find().exec();
  }

  async findOne(id: string): Promise<Flashcard | null> {
    return await this.flashcardModel.findById(id).exec();
  }

  async create(data: Partial<Flashcard>): Promise<Flashcard> {
    const created = new this.flashcardModel(data);
    return created.save();
  }

  async update(id: string, data: Partial<Flashcard>): Promise<Flashcard> {
    const updated = await this.flashcardModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();

    if (!updated) {
      throw new NotFoundException(`Flashcard with ID ${id} not found`);
    }

    return updated;
  }

  async remove(id: string): Promise<Flashcard> {
    const deleted = await this.flashcardModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Flashcard with ID ${id} not found`);
    }
    return deleted;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Foods, FoodsDocument } from './foods.schema';

@Injectable()
export class FoodsService {
  constructor(
    @InjectModel(Foods.name)
    private FoodsModel: Model<FoodsDocument>,
  ) {}

  async findAll(): Promise<Foods[]> {
    return await this.FoodsModel.find().exec();
  }

  async findOne(id: string): Promise<Foods | null> {
    return await this.FoodsModel.findById(id).exec();
  }

  async create(data: Partial<Foods>): Promise<Foods> {
    const created = new this.FoodsModel(data);
    return created.save();
  }

  async update(id: string, data: Partial<Foods>): Promise<Foods> {
    const updated = await this.FoodsModel.findByIdAndUpdate(id, data, {
      new: true,
    }).exec();

    if (!updated) {
      throw new NotFoundException(`Foods with ID ${id} not found`);
    }

    return updated;
  }

  async remove(id: string): Promise<Foods> {
    const deleted = await this.FoodsModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Foods with ID ${id} not found`);
    }
    return deleted;
  }
}

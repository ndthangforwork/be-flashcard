import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { FoodsService } from './foods.service';
import { Foods } from './foods.schema';

@Controller('foods')
export class FoodsController {
  constructor(private readonly FoodsService: FoodsService) {}

  @Get()
  async getAll(): Promise<Foods[]> {
    return this.FoodsService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Foods> {
    const card = await this.FoodsService.findOne(id);
    if (!card) {
      throw new NotFoundException(`Foods with ID ${id} not found`);
    }
    return card;
  }

  @Post()
  async create(@Body() data: Partial<Foods>): Promise<Foods> {
    return this.FoodsService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Foods>,
  ): Promise<Foods> {
    return await this.FoodsService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Foods> {
    return this.FoodsService.remove(id);
  }
}

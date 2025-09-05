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
import { FlashcardsService } from './flashcards.service';
import { Flashcard } from './flashcards.schema';

@Controller('flashcards')
export class FlashcardsController {
  constructor(private readonly flashcardsService: FlashcardsService) {}

  @Get()
  async getAll(): Promise<Flashcard[]> {
    return this.flashcardsService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Flashcard> {
    const card = await this.flashcardsService.findOne(id);
    if (!card) {
      throw new NotFoundException(`Flashcard with ID ${id} not found`);
    }
    return card;
  }

  @Post()
  async create(@Body() data: Partial<Flashcard>): Promise<Flashcard> {
    return this.flashcardsService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Flashcard>,
  ): Promise<Flashcard> {
    return await this.flashcardsService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Flashcard> {
    return this.flashcardsService.remove(id);
  }
}

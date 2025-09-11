import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Foods, FoodsSchema } from './foods.schema';
import { FoodsService } from './foods.service';
import { FoodsController } from './foods.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Foods.name, schema: FoodsSchema }]),
  ],
  controllers: [FoodsController],
  providers: [FoodsService],
})
export class FoodsModule {}

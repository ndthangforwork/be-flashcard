import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FlashcardsModule } from './flashcards/flashcards.module';
import { FoodsModule } from './foods/foods.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://ndthangforwork_db_user:Thangit123@flashcard.kihhbvl.mongodb.net/flashcard-web',
    ),
    FlashcardsModule,
    FoodsModule,
  ],
})
export class AppModule {}

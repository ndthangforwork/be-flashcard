import { Module } from '@nestjs/common';
import { KanjiController } from './kanji.controller';
import { KanjiService } from './kanji.service';

@Module({
  controllers: [KanjiController],
  providers: [KanjiService],
  exports: [KanjiService], // để module khác dùng nếu cần
})
export class KanjiModule {}
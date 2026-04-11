import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { KanjiService } from './kanji.service';

@Controller('kanji')
export class KanjiController {
  constructor(private readonly kanjiService: KanjiService) {}

  @Post('recognize')
        // Hãy nhận cả 'body' là một object, sau đó mới lấy strokes ra
        async recognize(@Body() body: { strokes: any[] }) { 
        console.log('Dữ liệu nhận được từ FE:', body);
        
        if (!body.strokes) {
            throw new BadRequestException('Thanh niên ơi, thiếu key "strokes" trong body rồi!');
        }

        return this.kanjiService.recognize(body.strokes);
        }

    @Post('check-result')
        // Hãy nhận cả 'body' là một object, sau đó mới lấy strokes ra
        async checkResult(@Body() body: { strokes: any[] }) { 
            console.log('Dữ liệu nhận được từ FE:', body);
            
            if (!body.strokes) {
                throw new BadRequestException('Thanh niên ơi, thiếu key "strokes" trong body rồi!');
            }

            return this.kanjiService.checkResult(body.strokes);
        }
}
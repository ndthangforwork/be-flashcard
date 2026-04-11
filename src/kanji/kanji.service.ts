import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class KanjiService {
  async recognize(strokes: any[]) {
    if (!strokes || strokes.length === 0) {
      throw new BadRequestException('Chưa có dữ liệu nét vẽ');
    }

    try {
      // --- BƯỚC 1: NHẬN DIỆN CHỮ VIẾT TAY ---
      const handwritingUrl = 'https://www.google.com/inputtools/request?ime=handwriting&app=autotext&dbg=1&cs=1&oe=UTF-8';
      const hwResponse = await axios.post(
        handwritingUrl,
        {
          input_type: '0',
          requests: [
            {
              writing_guide: { writing_area_width: 400, writing_area_height: 400 },
              ink: strokes,
              language: 'ja',
              itc: 'ja-t-i0-handwrit',
            },
          ],
        },
        { headers: { 'Content-Type': 'application/json' } },
      );

      if (hwResponse.data[0] !== 'SUCCESS') {
        throw new Error('Handwriting API failed');
      }

      const candidates = hwResponse.data[1][0][1] || [];
      const topKanji = candidates[0] || '';

      // --- BƯỚC 2: TRA NGHĨA TIẾNG VIỆT (Nếu có kết quả) ---
      let meaning = '';
      if (topKanji) {
        meaning = await this.translateToVietnamese(topKanji);
      }

      return {
        success: true,
        top: topKanji,
        meaning: meaning, // Nghĩa tiếng Việt mới thêm
        candidates: candidates,
      };
    } catch (error: any) {
      console.error('LỖI SERVICE:', error.message);
      throw new InternalServerErrorException('Lỗi hệ thống khi xử lý Kanji');
    }
  }

  // Hàm phụ để dịch nghĩa sang tiếng Việt
  private async translateToVietnamese(text: string): Promise<string> {
    try {
      // Sử dụng API Google Translate (phiên bản miễn phí cho trình duyệt)
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=ja&tl=vi&dt=t&q=${encodeURIComponent(text)}`;
      const res = await axios.get(url);
      
      // Cấu trúc trả về của Google Translate: [[[ "Nghĩa", "Từ gốc", ...]]]
      return res.data[0][0][0] || 'Không tìm thấy nghĩa';
    } catch (err) {
      console.error('Lỗi dịch:', err);
      return 'Lỗi tra nghĩa';
    }
  }

  async checkResult(strokes: any[]) {
    if (!strokes || strokes.length === 0) {
      throw new BadRequestException('Chưa có dữ liệu nét vẽ');
    }

    try {
      // --- BƯỚC 1: NHẬN DIỆN CHỮ VIẾT TAY ---
      const handwritingUrl = 'https://www.google.com/inputtools/request?ime=handwriting&app=autotext&dbg=1&cs=1&oe=UTF-8';
      const hwResponse = await axios.post(
        handwritingUrl,
        {
          input_type: '0',
          requests: [
            {
              writing_guide: { writing_area_width: 600, writing_area_height: 400 },
              ink: strokes,
              language: 'ja',
              itc: 'ja-t-i0-handwrit',
            },
          ],
        },
        { headers: { 'Content-Type': 'application/json' } },
      );

      if (hwResponse.data[0] !== 'SUCCESS') {
        throw new Error('Handwriting API failed');
      }

      const candidates = hwResponse.data[1][0][1] || [];
      const topKanji = candidates[0] || '';

      return {
        success: true,
        top: topKanji,
        candidates: candidates,
      };
    } catch (error: any) {
      console.error('LỖI SERVICE:', error.message);
      throw new InternalServerErrorException('Lỗi hệ thống khi xử lý Kanji');
    }
  }
}
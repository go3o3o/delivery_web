import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HttpService } from './services/http.service';
import { BusinessJusoService } from './services/business-juso/business-juso.service';
import { KakaoService } from './services/kakao/kakao.service';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [HttpService, BusinessJusoService, KakaoService],
  exports: [BusinessJusoService, KakaoService],
})
export class CommonModule {}

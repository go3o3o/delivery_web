import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpService as AxiosHttpService } from '@nestjs/axios';

import { lastValueFrom } from 'rxjs';
import { AxiosRequestConfig } from 'axios';

interface HttpResponse<T> {
  data: T | any;
  status?: number;
}
@Injectable()
export class HttpService {
  constructor(private readonly httpService: AxiosHttpService) {}

  async request<T>(
    requestOptions: AxiosRequestConfig,
  ): Promise<HttpResponse<T>> {
    const request = this.httpService.request(requestOptions);
    let status = HttpStatus.OK;
    let data: T;
    try {
      const response = await lastValueFrom(request);
      data = response.data;
    } catch (error) {
      status = error.response.status;
      data = error.response.data;
    }
    return { status, data };
  }
}

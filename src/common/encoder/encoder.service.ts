import { Injectable } from '@nestjs/common';

@Injectable()
export class EncoderService {
  encode(value: string | number): string {
    return Buffer.from(String(value)).toString('base64');
  }

  decode(value: string): string {
    return Buffer.from(value, 'base64').toString('utf-8');
  }
}

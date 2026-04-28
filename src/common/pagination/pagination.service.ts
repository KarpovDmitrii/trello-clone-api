import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder } from 'kysely';
import { EncoderService } from '../encoder/encoder.service';
import { CursorPaginationParamsDto } from './dto/cursor-pagination-params.dto';

@Injectable()
export class PaginationService {
  constructor(private readonly encoderService: EncoderService) {}

  async paginate<DB, TB extends keyof DB, O>(
    queryBuilder: SelectQueryBuilder<DB, TB, O>,
    params: CursorPaginationParamsDto,
    cursorColumn: string = 'id',
  ) {
    const limit = params.limit;
    const cursor = params.nextCursor;
    const decodedCursor = cursor ? this.encoderService.decode(cursor) : null;

    let query = queryBuilder;
    if (decodedCursor) {
      query = query.where(cursorColumn as any, '>', decodedCursor);
    }

    const items = await query.limit(limit + 1).execute();

    const hasMore = items.length > limit;

    const data = hasMore ? items.slice(0, limit) : items;

    let nextCursor: string | null = null;
    if (hasMore && data.length > 0) {
      const lastItem = data[data.length - 1];

      const lastId = (lastItem as any)[cursorColumn];
      if (lastId !== undefined && lastId !== null) {
        nextCursor = this.encoderService.encode(String(lastId));
      }
    }

    return {
      data,
      meta: {
        hasMore,
        nextCursor,
      },
    };
  }
}

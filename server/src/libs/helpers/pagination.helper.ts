import { PaginationQuery } from '../dto/pagination.query';
import { IPagination } from '../interfaces/response.interface';

export function findPagination(query: PaginationQuery) {
  const page = query.page ?? 1;
  const size = query.size ?? 50;
  const sortBy = query.sortBy;

  const listSort = sortBy ? sortBy.split(',') : [];
  const order = listSort.reduce((acc, cur) => {
    const [column, ordering] = cur.split('-');
    acc[column] = ordering;
    return acc;
  }, {});

  return {
    skip: (page - 1) * size,
    take: size,
    order: Object.keys(order).length > 0 ? order : { id: 'ASC' },
  };
}

export function responsePagination(
  total: number,
  count: number,
  query: PaginationQuery,
): IPagination {
  const page = query.page ? query.page : 1;
  const totalPage = Math.ceil(total / query.size) || 1;
  return {
    totalRow: +total,
    pageRow: count,
    hasNext: totalPage > page,
    totalPage: totalPage,
    page: page,
    size: +query.size,
  };
}

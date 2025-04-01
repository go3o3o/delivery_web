import {
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhereProperty,
  QueryRunner,
} from 'typeorm';

/** 기본 DB 쿼리 옵션 */
export type QueryTransactionOption = { transaction?: QueryRunner };
export type QueryListOption = { skip?: number; take?: number };
export type QuerySelectOption<T> = { select?: T[] };
export type QueryOrderOption<T> = { order?: FindOptionsOrder<T> };
export type QueryRelationOption<T> = { relations?: FindOptionsRelations<T> };

/** Condition 조건 중 undefined | string | number | boolean | Date 타입들에 TypeOrm 기존의 여러 조건을 허용 */
export type PropertiesToFindOperator<T> = {
  [K in keyof T]: T[K] extends undefined | string | number | boolean | Date
    ? FindOptionsWhereProperty<Required<T>[K]> | T[K]
    : T[K];
};

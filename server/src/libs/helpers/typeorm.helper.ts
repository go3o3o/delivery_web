import { FindOperator, IsNull } from 'typeorm';

/** 쿼리 조건문 Null => IsNull() 변환 */
export function setNullToIsNull(
  condition: Record<string, any>,
): Record<string, any> {
  return this.replaceObjectValuesExcludingFindOperator(
    condition,
    null,
    IsNull(),
  );
}

/** Object 내 특정 값을 다른 값으로 대체한다 * TypeOrm 기능 Object 제외  */
export function replaceObjectValueExceptFindOperator(
  obj: { [key: string]: any },
  targetValue: any,
  replaceValue: any,
): { [key: string]: any } {
  const newObj: typeof obj = {};

  Object.entries(obj).forEach(([key, value]) => {
    // TypeORM의 `FindOperator`는 변경하지 않음
    if (value instanceof FindOperator) {
      newObj[key] = value;
      return;
    }

    // 대상 값이면 변경
    if (value === targetValue) {
      newObj[key] = replaceValue;
      return;
    }

    // 객체인 경우 재귀 호출
    if (value && typeof value === 'object') {
      newObj[key] =
        value instanceof Date
          ? value // Date 객체는 변경하지 않음
          : replaceObjectValueExceptFindOperator(
              value,
              targetValue,
              replaceValue,
            );
    } else {
      newObj[key] = value;
    }
  });

  return newObj;
}

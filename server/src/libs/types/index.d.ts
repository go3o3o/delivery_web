/* 모든 key 값을 Pick 으로 선택 가능하면서, 실제 존재하는 값만 Pick */
export type PickIfExist<T, K extends keyof any> = Omit<T, Exclude<keyof T, K>>;

/** 최소 Object 내 속성값 하나는 빈값이 아니어야 한다 */
export type NotEmpty<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> &
    Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

/** 특정 속성들을 Optional 값으로 변경 */
export type SomeToOptional<T, K extends keyof T> = Omit<T, K> &
  DeepPartial<Pick<T, K>>;

/** Optional 값을 nullable 하게 변경 */
export type OptionalToNullable<T> = {
  [K in keyof T]: undefined extends T[K] ? T[K] | null : T[K];
};

import { Transform, TransformFnParams } from 'class-transformer';

export function StringToBoolean() {
  return Transform((params: TransformFnParams) =>
    params.value === 'true' || params.value === 'false'
      ? JSON.parse(params.value)
      : params.value,
  );
}

export function StringToNumber() {
  return Transform((params: TransformFnParams) =>
    params.value == +params.value ? +params.value : params.value,
  );
}

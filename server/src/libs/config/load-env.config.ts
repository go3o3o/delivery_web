import type { ConfigModuleOptions } from '@nestjs/config';

export const isLocal = (): boolean => process.env.NODE_ENV === 'local';
export const isDevelop = (): boolean => process.env.NODE_ENV === 'development';
export const isProduction = (): boolean =>
  process.env.NODE_ENV === 'production';

export const isNotProduction = () => isLocal() || isDevelop();

export const loadConfig = (): ConfigModuleOptions => {
  const NODE_ENV = process.env.NODE_ENV;
  console.log(`### NODE_ENV: ${NODE_ENV}`);
  if (!NODE_ENV) {
    throw new Error(`Not found NODE_ENV`);
  }

  const options: ConfigModuleOptions = { isGlobal: true };
  if (!isLocal()) {
    /**
     * [TO-BE]
     * - AWS Parameter Store 에서 가져오기
     */
    // options.load = [loadParameterStore(NODE_ENV)];
    return options;
  }

  options.envFilePath = '.env.local';
  return options;
};

import type { Awaited } from '../../types';
declare type Func = (...args: any[]) => any;
export declare type DebouncedFunction<TFunction extends Func> = (this: ThisParameterType<TFunction>, ...args: Parameters<TFunction>) => Promise<Awaited<ReturnType<TFunction>>>;
export declare function debounce<TFunction extends Func>(func: TFunction, wait: number): DebouncedFunction<TFunction>;
export {};

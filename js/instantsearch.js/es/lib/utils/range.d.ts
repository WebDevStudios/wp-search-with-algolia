declare type RangeOptions = {
    start?: number;
    end: number;
    step?: number;
};
declare function range({ start, end, step }: RangeOptions): number[];
export default range;

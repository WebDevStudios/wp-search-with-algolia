/**
 * This is a fork of Rheostat for Preact X.
 *
 * @see https://github.com/airbnb/rheostat
 */
/** @jsx h */
import type { ComponentChildren, ComponentType, JSX } from 'preact';
import { Component } from 'preact';
declare type BoundingBox = {
    height: number;
    left: number;
    top: number;
    width: number;
};
declare function Button(props: JSX.IntrinsicElements['button']): JSX.Element;
declare type Style = {
    position?: 'absolute';
    top?: number | string;
    left?: number | string;
    height?: string;
    width?: string;
};
export declare type PitProps = {
    children: number | string;
    style: Style;
};
export declare type HandleProps = {
    'aria-valuemax'?: number;
    'aria-valuemin'?: number;
    'aria-valuenow'?: number;
    'aria-disabled': boolean;
    'data-handle-key': number;
    className: 'rheostat-handle';
    key: string;
    onClick: (e: MouseEvent) => void;
    onKeyDown?: (e: KeyboardEvent) => void;
    onMouseDown?: (e: MouseEvent) => void;
    onTouchStart?: (e: TouchEvent) => void;
    role: 'slider';
    style: JSX.HTMLAttributes['style'];
    tabIndex: number;
};
declare type Props = {
    children?: ComponentChildren;
    className?: string;
    disabled?: boolean;
    handle?: ComponentType<HandleProps>;
    max?: number;
    min?: number;
    onClick?(...args: unknown[]): unknown;
    onChange?(...args: unknown[]): unknown;
    onKeyPress?(...args: unknown[]): unknown;
    onSliderDragEnd?(...args: unknown[]): unknown;
    onSliderDragMove?(...args: unknown[]): unknown;
    onSliderDragStart?(...args: unknown[]): unknown;
    onValuesUpdated?(...args: unknown[]): unknown;
    orientation?: 'horizontal' | 'vertical';
    pitComponent?: ComponentType<PitProps>;
    pitPoints?: number[];
    progressBar?: ComponentType<JSX.HTMLAttributes>;
    snap?: boolean;
    snapPoints?: number[];
    values?: number[];
};
declare type State = {
    className: string;
    handlePos: number[];
    handleDimensions: number;
    mousePos: {
        x: number;
        y: number;
    } | null;
    sliderBox: Partial<BoundingBox>;
    slidingIndex: number | null;
    values: number[];
};
declare class Rheostat extends Component<Props, State> {
    static defaultProps: {
        className: string;
        children: null;
        disabled: boolean;
        handle: typeof Button;
        max: number;
        min: number;
        onClick: null;
        onChange: null;
        onKeyPress: null;
        onSliderDragEnd: null;
        onSliderDragMove: null;
        onSliderDragStart: null;
        onValuesUpdated: null;
        orientation: string;
        pitComponent: null;
        pitPoints: never[];
        progressBar: string;
        snap: boolean;
        snapPoints: never[];
        values: number[];
    };
    state: State;
    private rheostat;
    constructor(props: Props);
    componentWillReceiveProps(nextProps: Required<Props>): void;
    private getPublicState;
    private getSliderBoundingBox;
    private getProgressStyle;
    private getMinValue;
    private getMaxValue;
    private getHandleDimensions;
    private getClosestSnapPoint;
    private getSnapPosition;
    private getNextPositionForKey;
    private getNextState;
    private getClosestHandle;
    private setStartSlide;
    private startMouseSlide;
    private startTouchSlide;
    private handleMouseSlide;
    private handleTouchSlide;
    private handleSlide;
    private endSlide;
    private handleClick;
    private handleKeydown;
    private validatePosition;
    private validateValues;
    canMove(idx: number, proposedPosition: number): boolean;
    fireChangeEvent(): void;
    slideTo(idx: number, proposedPosition: number, onAfterSet?: () => void): void;
    updateNewValues(nextProps: Required<Props>): void;
    render(): JSX.Element;
}
export default Rheostat;

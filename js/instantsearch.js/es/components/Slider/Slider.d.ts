/** @jsx h */
import { h, Component } from 'preact';
import type { RangeBoundaries } from '../../connectors/range/connectRange';
import type { RangeSliderCssClasses, RangeSliderWidgetParams } from '../../widgets/range-slider/range-slider';
import type { ComponentCSSClasses } from '../../types';
export declare type RangeSliderComponentCSSClasses = ComponentCSSClasses<RangeSliderCssClasses>;
export declare type SliderProps = {
    refine(values: RangeBoundaries): void;
    min?: number;
    max?: number;
    values: RangeBoundaries;
    pips?: boolean;
    step?: number;
    tooltips?: RangeSliderWidgetParams['tooltips'];
    cssClasses: RangeSliderComponentCSSClasses;
};
declare class Slider extends Component<SliderProps> {
    private get isDisabled();
    private handleChange;
    private computeDefaultPitPoints;
    private computeSnapPoints;
    private createHandleComponent;
    render(): h.JSX.Element;
}
export default Slider;

/** @jsx h */
import { h, Component } from 'preact';
import type { RangeInputCSSClasses, RangeInputTemplates } from '../../widgets/range-input/range-input';
import type { Range, RangeBoundaries } from '../../connectors/range/connectRange';
import type { ComponentCSSClasses } from '../../types';
export declare type RangeInputComponentCSSClasses = ComponentCSSClasses<RangeInputCSSClasses>;
export declare type RangeInputComponentTemplates = Required<RangeInputTemplates>;
export declare type RangeInputProps = {
    min?: number;
    max?: number;
    step: number;
    values: Partial<Range>;
    cssClasses: RangeInputComponentCSSClasses;
    templateProps: {
        templates: RangeInputComponentTemplates;
    };
    refine(rangeValue: RangeBoundaries): void;
};
declare class RangeInput extends Component<RangeInputProps, Partial<Range>> {
    state: {
        min: import("../../connectors/range/connectRange").RangeMin;
        max: import("../../connectors/range/connectRange").RangeMax;
    };
    componentWillReceiveProps(nextProps: RangeInputProps): void;
    private onInput;
    private onSubmit;
    render(): h.JSX.Element;
}
export default RangeInput;

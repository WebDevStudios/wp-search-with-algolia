/** @jsx h */
import { h, Component } from 'preact';
import { noop } from '../../lib/utils';
import type { SearchBoxCSSClasses, SearchBoxTemplates } from '../../widgets/search-box/search-box';
import type { ComponentCSSClasses } from '../../types';
export declare type SearchBoxComponentCSSClasses = ComponentCSSClasses<SearchBoxCSSClasses>;
export declare type SearchBoxComponentTemplates = Required<SearchBoxTemplates>;
declare type SearchBoxProps = {
    placeholder?: string;
    cssClasses: SearchBoxComponentCSSClasses;
    templates: SearchBoxComponentTemplates;
    query?: string;
    showSubmit?: boolean;
    showReset?: boolean;
    showLoadingIndicator?: boolean;
    refine?: (value: string) => void;
    autofocus?: boolean;
    searchAsYouType?: boolean;
    isSearchStalled?: boolean;
    disabled?: boolean;
    onChange?: (event: Event) => void;
    onSubmit?: (event: Event) => void;
    onReset?: (event: Event) => void;
};
declare const defaultProps: {
    query: string;
    showSubmit: boolean;
    showReset: boolean;
    showLoadingIndicator: boolean;
    autofocus: boolean;
    searchAsYouType: boolean;
    isSearchStalled: boolean;
    disabled: boolean;
    onChange: typeof noop;
    onSubmit: typeof noop;
    onReset: typeof noop;
    refine: typeof noop;
};
declare type SearchBoxPropsWithDefaultProps = SearchBoxProps & Readonly<typeof defaultProps>;
declare type SearchBoxState = {
    query: string;
    focused: boolean;
};
declare class SearchBox extends Component<SearchBoxPropsWithDefaultProps, SearchBoxState> {
    static defaultProps: {
        query: string;
        showSubmit: boolean;
        showReset: boolean;
        showLoadingIndicator: boolean;
        autofocus: boolean;
        searchAsYouType: boolean;
        isSearchStalled: boolean;
        disabled: boolean;
        onChange: typeof noop;
        onSubmit: typeof noop;
        onReset: typeof noop;
        refine: typeof noop;
    };
    state: {
        query: string;
        focused: boolean;
    };
    private input;
    /**
     * This public method is used in the RefinementList SFFV search box
     * to reset the input state when an item is selected.
     *
     * @see RefinementList#componentWillReceiveProps
     * @return {undefined}
     */
    resetInput(): void;
    private onInput;
    componentWillReceiveProps(nextProps: SearchBoxPropsWithDefaultProps): void;
    private onSubmit;
    private onReset;
    private onBlur;
    private onFocus;
    render(): h.JSX.Element;
}
export default SearchBox;


import type { JSX } from 'preact';
import { Component } from 'preact';
import type { BindEventForHits, SendEventForHits } from '../../lib/utils';
import type { PreparedTemplateProps } from '../../lib/templating';
import type { Templates } from '../../types';
declare const defaultProps: {
    data: {};
    rootTagName: string;
    useCustomCompileOptions: {};
    templates: {};
    templatesConfig: {};
};
export declare type TemplateProps = {
    data?: Record<string, any>;
    rootProps?: Record<string, any>;
    rootTagName?: keyof JSX.IntrinsicElements;
    templateKey: string;
    bindEvent?: BindEventForHits;
    sendEvent?: SendEventForHits;
} & PreparedTemplateProps<Templates> & Readonly<typeof defaultProps>;
declare class Template extends Component<TemplateProps> {
    static readonly defaultProps: {
        data: {};
        rootTagName: string;
        useCustomCompileOptions: {};
        templates: {};
        templatesConfig: {};
    };
    shouldComponentUpdate(nextProps: TemplateProps): boolean;
    render(): JSX.Element | null;
}
export default Template;

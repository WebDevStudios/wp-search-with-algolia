/** @jsx h */
import type { JSX } from 'preact';
import { Component } from 'preact';
import type { PreparedTemplateProps } from '../../lib/utils/prepareTemplateProps';
import type { Templates } from '../../types';
declare const defaultProps: {
    data: {};
    rootTagName: string;
    useCustomCompileOptions: {};
    templates: {};
    templatesConfig: {};
};
declare type TemplateProps = {
    data?: Record<string, any>;
    rootProps?: Record<string, any>;
    rootTagName?: keyof JSX.IntrinsicElements;
    templateKey: string;
    bindEvent?: (...args: any[]) => string;
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

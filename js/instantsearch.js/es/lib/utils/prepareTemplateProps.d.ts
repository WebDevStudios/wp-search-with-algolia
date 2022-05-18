import type { HoganHelpers, Templates } from '../../types';
import type { HoganOptions } from 'hogan.js';
declare type TemplatesConfig = {
    helpers?: HoganHelpers;
    compileOptions?: HoganOptions;
};
export declare type PreparedTemplateProps<TTemplates extends Templates> = {
    templatesConfig: TemplatesConfig;
    templates: TTemplates;
    useCustomCompileOptions: {
        [TKey in keyof Partial<TTemplates>]: boolean;
    };
};
/**
 * Prepares an object to be passed to the Template widget
 */
declare function prepareTemplateProps<TTemplates extends Templates>({ defaultTemplates, templates, templatesConfig, }: {
    defaultTemplates: TTemplates;
    templates?: Partial<TTemplates>;
    templatesConfig: TemplatesConfig;
}): PreparedTemplateProps<TTemplates>;
export default prepareTemplateProps;

import type { HoganOptions } from 'hogan.js';
import type { Templates, HoganHelpers } from '../../types';
import type { BindEventForHits } from './createSendEventForHits';
declare function renderTemplate({ templates, templateKey, compileOptions, helpers, data, bindEvent, }: {
    templates: Templates;
    templateKey: string;
    compileOptions?: HoganOptions;
    helpers?: HoganHelpers;
    data?: Record<string, any>;
    bindEvent?: BindEventForHits;
}): string;
export default renderTemplate;

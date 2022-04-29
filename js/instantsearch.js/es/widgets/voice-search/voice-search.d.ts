/** @jsx h */
import type { PlainSearchParameters } from 'algoliasearch-helper';
import type { VoiceSearchConnectorParams, VoiceSearchWidgetDescription } from '../../connectors/voice-search/connectVoiceSearch';
import type { WidgetFactory, Template } from '../../types';
import type { CreateVoiceSearchHelper } from '../../lib/voiceSearchHelper/types';
export declare type VoiceSearchCSSClasses = Partial<{
    root: string | string[];
    button: string | string[];
    status: string | string[];
}>;
declare type VoiceSearchTemplateProps = {
    status: string;
    errorCode: string;
    isListening: boolean;
    transcript: string;
    isSpeechFinal: boolean;
    isBrowserSupported: boolean;
};
export declare type VoiceSearchTemplates = Partial<{
    buttonText: Template<VoiceSearchTemplateProps>;
    status: Template<VoiceSearchTemplateProps>;
}>;
export declare type VoiceSearchWidgetParams = {
    container: string | HTMLElement;
    cssClasses?: VoiceSearchCSSClasses;
    templates?: VoiceSearchTemplates;
    searchAsYouSpeak?: boolean;
    language?: string;
    additionalQueryParameters?: (params: {
        query: string;
    }) => PlainSearchParameters | void;
    createVoiceSearchHelper?: CreateVoiceSearchHelper;
};
export declare type VoiceSearchWidget = WidgetFactory<VoiceSearchWidgetDescription & {
    $$type: 'ais.voiceSearch';
}, VoiceSearchConnectorParams, VoiceSearchWidgetParams>;
declare const voiceSearch: VoiceSearchWidget;
export default voiceSearch;

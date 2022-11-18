import type { PlainSearchParameters } from 'algoliasearch-helper';
import type { Connector, WidgetRenderState } from '../../types';
import type { CreateVoiceSearchHelper, VoiceListeningState } from '../../lib/voiceSearchHelper/types';
export declare type VoiceSearchConnectorParams = {
    searchAsYouSpeak?: boolean;
    language?: string;
    additionalQueryParameters?: (params: {
        query: string;
    }) => PlainSearchParameters | void;
    createVoiceSearchHelper?: CreateVoiceSearchHelper;
};
export declare type VoiceSearchRenderState = {
    isBrowserSupported: boolean;
    isListening: boolean;
    toggleListening: () => void;
    voiceListeningState: VoiceListeningState;
};
export declare type VoiceSearchWidgetDescription = {
    $$type: 'ais.voiceSearch';
    renderState: VoiceSearchRenderState;
    indexRenderState: {
        voiceSearch: WidgetRenderState<VoiceSearchRenderState, VoiceSearchConnectorParams>;
    };
    indexUiState: {
        query: string;
    };
};
export declare type VoiceSearchConnector = Connector<VoiceSearchWidgetDescription, VoiceSearchConnectorParams>;
declare const connectVoiceSearch: VoiceSearchConnector;
export default connectVoiceSearch;

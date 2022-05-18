export declare type Status = 'initial' | 'askingPermission' | 'waiting' | 'recognizing' | 'finished' | 'error';
export declare type VoiceListeningState = {
    status: Status;
    transcript: string;
    isSpeechFinal: boolean;
    errorCode?: string;
};
export declare type VoiceSearchHelperParams = {
    searchAsYouSpeak: boolean;
    language?: string;
    onQueryChange: (query: string) => void;
    onStateChange: () => void;
};
export declare type VoiceSearchHelper = {
    getState: () => VoiceListeningState;
    isBrowserSupported: () => boolean;
    isListening: () => boolean;
    startListening: () => void;
    stopListening: () => void;
    dispose: () => void;
};
export declare type CreateVoiceSearchHelper = (params: VoiceSearchHelperParams) => VoiceSearchHelper;

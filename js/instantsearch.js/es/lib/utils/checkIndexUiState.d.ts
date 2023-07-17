import type { IndexUiState } from '../../types';
import type { IndexWidget } from '../../widgets/index/index';
type CheckIndexUiStateParams = {
    index: IndexWidget;
    indexUiState: IndexUiState;
};
export declare function checkIndexUiState({ index, indexUiState, }: CheckIndexUiStateParams): void;
export {};

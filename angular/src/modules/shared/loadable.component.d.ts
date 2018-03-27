import { TranslationService } from './translation-service';
/**
 * Convenience class to wrap JQuery calls ...
 *
 * Author: <a href='https://github.com/shilob' target='_blank'>Shilo Banihit</a>
 *
 */
export declare class LoadableComponent {
    isLoading: boolean;
    translatorReady: boolean;
    translationService: any;
    spinnerElem: string;
    constructor();
    initTranslator(translationService: TranslationService): void;
    translatorLoaded(): void;
    checkIfHasLoaded(): void;
    hasLoaded(): boolean;
    setLoading(loading?: boolean): void;
    synchLoading(): void;
}

import { TranslateI18Next } from 'ngx-i18next';
import { ConfigService } from './config-service';
/**
 * Translation service...
 *
 * Author: <a href='https://github.com/shilob' target='_blank'>Shilo Banihit</a>
 *
 */
export declare class TranslationService {
    protected translateI18Next: TranslateI18Next;
    protected configService: ConfigService;
    protected subjects: any;
    protected translatorReady: boolean;
    protected config: any;
    constructor(translateI18Next: TranslateI18Next, configService: ConfigService);
    initTranslator(): void;
    translatorLoaded(): void;
    isReady(handler: any): any;
    t(key: string): string;
}

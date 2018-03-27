import { PipeTransform } from '@angular/core';
export declare class StringTemplatePipe implements PipeTransform {
    transform(templateString: string, args?: any[]): string;
    generateTemplateString: (template: any) => any;
}

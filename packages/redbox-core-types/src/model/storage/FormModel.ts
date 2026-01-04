import { FormConfigFrame } from '@researchdatabox/sails-ng-common';

export interface FormModel extends FormConfigFrame {
    name: string;
    customAngularApp: FormCustomAngularApp;
    fields: {
        [key: string]: any;
    }[];
    workflowStep: string;
    type: string;
    messages: {
        [key: string]: any;
    };
    requiredFieldIndicator: string;
    viewCssClasses: string;
    editCssClasses: string;
    skipValidationOnSave: boolean;
    attachmentFields: any;
}

export interface FormCustomAngularApp {
  appName:string;
  appSelector:string;
}

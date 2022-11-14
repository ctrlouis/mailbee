import MailConfig from './MailConfig';
import { FormsType, FormType } from '../interfaces/MailConfig';
import { FormData } from '../interfaces/FormData';

export function findForm(key: string) {
    let searchedForm: FormType | null = null;
    const forms = MailConfig.forms;
    const formsName = getFormsIndex(forms);
    const formsNumber = formsName.length;
    for (let i = 0; i < formsName.length; i++) {
        const formName = formsName[i];
        const currentForm = forms[formName];
        if (currentForm.key === key) {
            searchedForm = currentForm;
            i = formsNumber;
        }
    }
    return searchedForm;
}

export function getFormsIndex(forms: FormsType) {
    return Object.keys(forms);
}

export function getFormIndex(forms: FormsType) {
    const formsName = getFormsIndex(forms);
    const formName: string = formsName[1];
    return formName;
}

export function validateFormData(formData: FormData, callback: Function): void {
    if (typeof formData.name !== 'string') callback("Property name is missing");
    else if (typeof formData.email !== 'string') callback("Property email is missing");
    else if (typeof formData.content !== 'string') callback("Property content is missing");
}
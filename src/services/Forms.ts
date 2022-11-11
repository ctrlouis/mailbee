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

export function validateFormData(formData :FormData) :FormData {
    if (typeof formData.name !== 'string') throw new Error("Property name is missing");
    if (typeof formData.email !== 'string') throw new Error("Property email is missing");
    if (typeof formData.content !== 'string') throw new Error("Property content is missing");
    return formData;
}

export function showErrors(errors) {

    let completeErrorsString = ''

    for (let key in errors) {
        if (errors.hasOwnProperty(key)) {
            completeErrorsString += ` - ${errors[key]}\n`;
        }
    }
    return completeErrorsString;
}
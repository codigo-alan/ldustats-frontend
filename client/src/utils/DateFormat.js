export function format(strDate) {
    const dateSplited = strDate.split('/').reverse();
    return `${dateSplited.join('-')}`;
}

export function transformToTextDate(date) {
    if (date == undefined) return '';
    const dateSplited = date.split('-');
    let month = '';
    switch (dateSplited[1]) {
        case '01':
            month = 'enero';
            break;
        case '02':
            month = 'febrero';
            break;
        case '03':
            month = 'marzo';
            break;
        case '04':
            month = 'abril';
            break;
        case '05':
            month = 'mayo';
            break;
        case '06':
            month = 'junio';
            break;
        case '07':
            month = 'julio';
            break;
        case '08':
            month = 'agosto';
            break;
        case '09':
            month = 'septiembre';
            break;
        case '10':
            month = 'octubre';
            break;
        case '11':
            month = 'noviembre';
            break;
        case '12':
            month = 'diciembre';
            break;

        default:
            break;
    }
    return `${dateSplited[2]} de ${month} de ${dateSplited[0]}`;
}

export function verifyDates(initDate, endDate) {
    return initDate < endDate
}
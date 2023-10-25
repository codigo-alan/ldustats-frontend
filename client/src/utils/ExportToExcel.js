import * as XLSX from "xlsx";

export function createWB(date) {
    //Create 
    var wb = XLSX.utils.book_new(); //workbook
    wb.Props = {
        Title: "LDU-U19" + date,
        Subject: "Backup",
        Author: localStorage.getItem("username"),
        CreatedDate: new Date()
    }; //workbook customs props
    return wb;
}

export function createWS(wb, element, title) {
    wb.SheetNames.push(title); //worksheet name
    const ws = XLSX.utils.table_to_sheet(element); //Add table to worksheet
    wb.Sheets[title] = ws; //asign worksheet to the specified sheet of wb
}

export function createWBout(wb) {
    //Export the workbook
    return XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
}

//Transform binary data to octet
export function s2ab(s) { 
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;    
}
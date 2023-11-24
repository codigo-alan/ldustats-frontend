import { Tooltip } from 'react-tooltip';
import { toast } from "react-hot-toast";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createWB, createWS, createWBout, s2ab } from "../../utils/ExportToExcel";
import { saveAs } from 'file-saver';

export function ExcelReportComponent({
    sessions = [], 
    isInterval = false, 
    drillTitlesSet = [], 
    dateSet = [], 
    player = ''}) {

    const downloadFile = () => {
        try {
            if (isInterval) {
                const wb = createWB(sessions[sessions.length - 1]?.date); //create workbook
                dateSet.forEach(d => {
                    createWS(wb, document.getElementById(d), d);
                }); //for each date create a worksheet
                const wbout = createWBout(wb); //write a wb with all the ws inside
                saveAs(new Blob([s2ab(wbout)], { type:"application/octet-stream"}), `LDU-U19_${player}_${sessions[0]?.date} a ${sessions[sessions.length - 1]?.date}.xlsx`); //download the file
            }else{
                const wb = createWB(sessions[0]?.date); //create workbook
                drillTitlesSet.forEach(drill => {
                    createWS(wb, document.getElementById(drill), drill);
                }); //for each drill create a worksheet
                createWS(wb, document.getElementById('complete'), 'complete'); //ws for complete table
                const wbout = createWBout(wb); //write a wb with all the ws inside
                saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), `LDU-U19_${player}_${sessions[0]?.date}.xlsx`); //download the file
            }
            
        } catch (error) {
            toast.error(`Error al descargar el fichero.\n ${error}`)
        }
    }

    return(
        <div className="col-4 d-flex justify-content-start">
            <button
                disabled={sessions.length <= 0}
                data-tooltip-id="excel-tooltip"
                data-tooltip-content="Exportar tablas a excel"
                data-tooltip-place="right"
                onClick={downloadFile}
                className="col-auto btn btn-success">
                <FontAwesomeIcon className="pe-2" icon={faFileExcel} />
                Exportar
            </button>
            <Tooltip id="excel-tooltip" />
        </div>
    );
};
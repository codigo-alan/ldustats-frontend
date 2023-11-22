import { Tooltip } from 'react-tooltip';
import { toast } from "react-hot-toast";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createWB, createWS, createWBout, s2ab } from "../../utils/ExportToExcel";

export function ExcelReportComponent({sessions = []}) {

    const downloadFile = () => {
        try {
            const wb = createWB(sessions[sessions.length - 1]?.date); //create workbook
            createWS(wb, document.getElementById("all"), "Sesiones intervaladas");
            const wbout = createWBout(wb); //write a wb with all the ws inside
            saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), `LDU-U19_${sessions[0]?.date}.xlsx`); //download the file
        } catch (error) {
            toast.error(`Error al descargar el fichero.\n ${error}`)
        }
    }

    return(
        <div className="col-4 d-flex justify-content-start">
            <button
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
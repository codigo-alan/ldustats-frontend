import { getAllFiles } from "../services/players.services";
import { TableComponent } from "../components/tableComponent/TableComponent";
import { useEffect, useState } from "react";

export function FilesPage(){
    const [files, setFiles] = useState([]); //declare files
    /*
        get Files and set the value
    */
    useEffect( () => {
        async function getFiles() {
            const res = await getAllFiles();
            setFiles(res.data);
        }

        getFiles();

    }, []);

    return (
        <div className="container p-3">
            <div>
                <h2>Ficheros subidos</h2>
            </div>
            <div className="row">
                <TableComponent data={files} type={'files'}></TableComponent>
            </div>
        </div>
    );
};

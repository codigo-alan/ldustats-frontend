import { getAllFiles } from "../services/files.services";
import { TableComponent } from "../components/tableComponent/TableComponent";
import { SearchBarComponent } from "../components/searchBarComponent/SearchBarComponent";
import { useEffect, useState } from "react";

export function FilesPage(){
    const [files, setFiles] = useState([]); //declare files
    const [filesFiltered, setFilesFiltered] = useState([]);
  
    const handleSearch = (query) => {
        setFilesFiltered(files.filter((e) => e.date.toLowerCase().includes(query.toLowerCase())))
    };

    /*
        get Files and set the value
    */
    useEffect( () => {
        async function getFiles() {
            const res = await getAllFiles();
            setFiles(res.data);
            setFilesFiltered(res.data);
        }

        getFiles();

    }, []);

    return (
        <div className="container p-3">
            <div>
                <h2>Ficheros subidos</h2>
            </div>
            <div className="my-2">
                <SearchBarComponent onSearch={handleSearch} type="files"></SearchBarComponent>
            </div>
            <div className="row">
                <TableComponent data={filesFiltered} type={'files'}></TableComponent>
            </div>
        </div>
    );
};

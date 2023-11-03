import { getAllFiles } from "../../services/files.services";
import { TableComponent } from "../../components/tableComponent/TableComponent";
import { SearchBarComponent } from "../../components/searchBarComponent/SearchBarComponent";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileSelectorComponent } from "../../components/fileSelectorComponent/FileSelectorComponent";


export function FilesPage(){
    const [files, setFiles] = useState([]); //declare files
    const [filesFiltered, setFilesFiltered] = useState([]);
    const navigate = useNavigate();
  
    const handleSearch = (query) => {
        setFilesFiltered(files.filter((e) => e.date.toLowerCase().includes(query.toLowerCase())))
    };

    /*
        get Files and set the value
    */
    useEffect( () => {
        async function getFiles() {
            try {
                const res = await getAllFiles();
                setFiles(res.data);
                setFilesFiltered(res.data);
            } catch (error) {
                if(error.response.status == 401 || error.response.status == 403) { //if unauthorized or without credentials
                    navigate(`/login`)
                  }
            }
        }

        getFiles();

    }, []);

    const addFileToList = (newFile) => {
        console.log(files);
        setFilesFiltered([...filesFiltered, newFile]);
        console.log(newFile.id);
    }

    return (
        <div className="container p-3">
            <div>
                <h2>Ficheros subidos</h2>
            </div>
            <div className="my-2 row">
                <div className="col-6">
                    <SearchBarComponent onSearch={handleSearch} type="files"></SearchBarComponent>
                </div>
                <div className="d-flex col-6 align-items-center justify-content-end">
                    <FileSelectorComponent addedFile={addFileToList}></FileSelectorComponent>
                </div>
            </div>
            
            <div className="row">
                <TableComponent data={filesFiltered} type={'files'}></TableComponent>
            </div>
        </div>
    );
};

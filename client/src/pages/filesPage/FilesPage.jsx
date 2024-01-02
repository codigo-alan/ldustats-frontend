import { getAllFiles } from "../../services/files.services";
import { TableComponent } from "../../components/tableComponent/TableComponent";
import { SearchBarComponent } from "../../components/searchBarComponent/SearchBarComponent";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileSelectorComponent } from "../../components/fileSelectorComponent/FileSelectorComponent";
import toast from "react-hot-toast";
import { deleteFile } from "../../services/files.services";
import { TeamSelectorComponent } from "../../components/teamSelectorComponent/TeamSelectorComponent";
import { getAllTeams } from "../../services/teams.services";


export function FilesPage(){
    const [files, setFiles] = useState([]); //declare files
    const [filesFiltered, setFilesFiltered] = useState([]);
    const [teams, setTeams] = useState([]);
    const [teamId, setTeamId] = useState('');
    const navigate = useNavigate();
  
    const handleSearch = (query) => {
        setFilesFiltered(files.filter((e) => 
            e.date.toLowerCase().includes(query.toLowerCase()) && e.team == teamId))
    };

    //When team selector change, need change the value of this self teamId
    const handleTeamChange = (newTeamId) => {
        setTeamId(JSON.parse(localStorage.getItem('team')).id)
    }

    /*
        get Files and set the value
    */
    useEffect( () => {

        async function getFiles() {
            try {
                const res = await getAllFiles();
                setFiles(res.data);
            } catch (error) {
                if(error.response.status == 401 || error.response.status == 403) { //if unauthorized or without credentials
                    navigate(`/login`)
                  }
            }
        }

        async function getTeams() {
            try {
                const res = await getAllTeams();
                setTeams(res.data);
                setTeamId(JSON.parse(localStorage.getItem('team')).id)
            } catch (error) {
                toast.error(error)
            }
        }

        getFiles();
        getTeams();

    }, []);

    //Change at teamId or files
    useEffect(() => {

        if (teamId != '' && files.length > 0) {
            setFilesFiltered(files.filter((e) =>
                e.team == teamId))
        }

    }, [files, teamId]);

    const addFileToList = (newFile) => setFiles([...files, newFile]);

    const removeFile = async (removedFileId) => {
        const accepted = window.confirm(`Desea eliminar el archivo ${removedFileId} y todas sus sesiones?`);
        if (accepted) {
            try {
                await deleteFile(removedFileId);
                const newFilesList = filesFiltered.filter(element => element.id !== removedFileId);
                setFilesFiltered(newFilesList);
                toast.success(`Eliminado el archivo ${removedFileId}`);
            } catch (error) {
                toast.error("Hubo un error al eliminar el archivo");
            }
        }
        
    }

    return (
        <div className="container p-3">
            <div className="row">
                <h2 className="col-auto">Ficheros subidos</h2>
                <TeamSelectorComponent
                    teamOptions={teams}
                    currentTeamId={teamId}
                    onSelectionChange={handleTeamChange}/>
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
                <TableComponent data={filesFiltered} type={'files'} fileIdToRemove={removeFile} ></TableComponent>
            </div>
        </div>
    );
};

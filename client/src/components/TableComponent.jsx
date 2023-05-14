

export function TableComponent({data}) {

    
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>Posición</th>
                    </tr>
                    {data.map((element) => {
                        return (
                            <tr key={element.id}>
                                <td>{element.name}</td>
                                <td>{element.birth}</td>
                                <td>{element.position}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}
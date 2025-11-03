function CreateSubTask ({setNewTesk, projectClick} ) {
    console.log(projectClick)
    return(
        <div>
            <header>
                <h3>Criar uma Nova Funcionalidade</h3>
            </header>
            <div>
                <div>
                    <input type="text"  placeholder="Titulo da nova funcionalidade"/>
                </div>
                <div>
                    <textarea placeholder="Descrição"></textarea>
                </div>
                <div>
                    <select>
                        <option value="">Prioridade</option>
                        <option value="Alta">Alta</option>
                        <option value="Média">Media</option>
                        <option value="Baixa">Baixa</option>
                    </select>
                </div>
                <button>Criar</button>

                <button onClick={() => setNewTesk(false)}>cancelar</button>
            </div>

        </div>
    )
}

export default CreateSubTask
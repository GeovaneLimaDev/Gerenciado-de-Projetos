import getTask from "../subtask/getTask"
import { auth } from "../firebaseConfig"
import deletTask from "../subtask/deletTask"
import deletProject from "./deletProject"
// apaga as sub task dos projetos apagados, evitando excesso de dados no banco
async function deletAll (project) {
    try {
        const user = auth.currentUser
        const arrayTask = await getTask(user, project.id)

        const result = arrayTask.map((item) => {
            deletTask(item.id)
        })

        deletProject(project.id)
    
        return 'Projeto deletado com sucesso!!'
    }catch(erro){
        return erro
    }
    
}

export default deletAll
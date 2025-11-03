export function addData  (project) {
    const data = JSON.stringify(project)
    
    localStorage.setItem('projeto', data)
}

export function getData () {
    const data = localStorage.getItem('projeto')

    const project = JSON.parse(data)
    return project
}
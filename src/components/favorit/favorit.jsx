import { useEffect, useState } from "react"
import getProject from "../../service/firebase/project/getProject"
import { auth } from "../../service/firebase/firebaseConfig"
import CardProject from "../cardProject/cardProject"

export default function Favorit () {
    const [fav, setFav] = useState([])
    const user = auth.currentUser
    useEffect(() => {
        async function busc (){
            const result = await getProject(user) 
            const favArray = result.filter(item => item.favorite === true)
            setFav(favArray)
        }
        busc()
    })
    return(
        <div>
            <header>
                ola
            </header>
            <div>
                {fav.map((item) => {
                    return <CardProject project={item}/>
                })}
            </div>
        </div>
    )
}
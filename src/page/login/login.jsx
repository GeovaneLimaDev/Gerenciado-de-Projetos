import { Link } from "react-router-dom"

function Login () {
    return(
        <div>
            <main>
                <h1>Fazer Login</h1>

                <form action="">
                    <div>
                        <input type="email" placeholder="Email" />
                    </div>
                    <div>
                        <input type="password" placeholder="Sua senha"/>
                    </div>
                    <div>
                    <Link to={"/cadastro"}>
                        <p>Criar Conta</p>
                    </Link>

                    <p>esqueci minha senha!</p>

                    <button>Entrar</button>
                </div>
                </form>

                
            </main>
        </div>

    )
}

export default Login
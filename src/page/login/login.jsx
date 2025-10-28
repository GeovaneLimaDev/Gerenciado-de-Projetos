import { Link } from "react-router-dom"

function Login () {
    return(
        <div>
            <main>
                <h1>Fazer Login</h1>

                <form action="">

                </form>

                <div>
                    <Link to={"/cadastro"}>
                        <p>Criar Conta</p>
                    </Link>

                    <p>esqueci minha senha!</p>

                    <button>Entrar</button>
                </div>
            </main>
        </div>

    )
}

export default Login
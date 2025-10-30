function NavBar () {
    return (
        <menu>
            <header>
                <div>
                    <p>Ola Pessoa</p>
                    <h3>Menu</h3>
                </div>
                <div>busca</div>
            </header>
            <aside>
                <p>Opções</p>
                <ul>
                    <li>Meus Projetos</li>
                </ul>
            </aside>
            <aside>
                <p>Projetos</p>
                <ul>
                    map
                </ul>
                <button> +  Novo projeto</button>
            </aside>
            <aside>
                <p>Tags</p>
                <ul>
                    map
                </ul>
                <button>+ Nova Tag</button>
            </aside>
            <section>
                <p>Configurações</p>
                <button>sair</button>
            </section>

        </menu>
    )
}

export default NavBar
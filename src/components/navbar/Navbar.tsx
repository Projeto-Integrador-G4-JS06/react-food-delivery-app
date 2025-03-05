import { ShoppingCart, User } from "@phosphor-icons/react";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DropdownUsuario } from "./DropdownUsuario";

function Navbar() {

	const navigate = useNavigate()

	const [nome, setNome] = useState<string>("")

	function handleBuscarProdutos(e: ChangeEvent<HTMLInputElement>){
		setNome(e.target.value)
	}

	function buscarProdutos(e: FormEvent<HTMLFormElement>){
		e.preventDefault()
		navigate(`/consultarnome/${nome}`)
		setNome('')
	}
	
	return (
		<>
			<div className="flex justify-center w-full px-15 py-4 text-white bg-slate-800">
				<div className="container flex items-center justify-between mx-4 text-lg">
					<Link to="/home">
						<img
							src="https://ik.imagekit.io/iyume/pede%20a%C3%AD/logo.png?updatedAt=1741184467390"
							alt="Logo"
							className="w-17"
						/>
					</Link>

					<div className="relative flex items-center justify-center w-2/5 text-black">
						<form 
							className="flex items-center justify-center w-full"
							onSubmit={buscarProdutos}
						>
							<input
								className="w-10/12 px-4 py-4 bg-white rounded-lg h-9 focus:outline-blue-500"
								type="search"
								placeholder="Busque por itens ou lojas"
								id="nome"
								name="nome"
								required
								value={nome}
								onChange={(e: ChangeEvent<HTMLInputElement>) => handleBuscarProdutos(e)}
							/>
							<button
								type="submit"
								className="h-9 w-9 p-2.5 ms-2 text-sm font-medium text-white bg-teal-500 hover:bg-teal-900 rounded-lg border border-teal-700"
							>
								<MagnifyingGlass
									size={17}
									weight="bold"
								/>
							</button>
						</form>
					</div>

					<div className="flex items-center gap-7 py-4">
						<Link
							to="/produtos"
							className="hover:-translate-y-1 transition duration-300 ease-in-out"
						>
							Produtos
						</Link>
						<Link
							to="/categorias"
							className="hover:-translate-y-1 transition duration-300 ease-in-out"
						>
							Categorias
						</Link>
						<Link
							to="/sobre"
							className="hover:-translate-y-1 transition duration-300 ease-in-out"
						>
							Sobre
						</Link>
							<DropdownUsuario />

							<ShoppingCart
								size={32}
								weight="bold"
								className="hover:-translate-y-1 transition duration-300 ease-in-out"
							/>
					</div>
				</div>
			</div>
		</>
	)
}

export default Navbar
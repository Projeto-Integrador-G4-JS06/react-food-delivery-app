import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"


function Perfil() {
	const navigate = useNavigate()

	const { usuario } = useContext(AuthContext)

	 useEffect(() => {
	 	if (usuario.token === "") {
	 		alert("Você precisa estar logado")
	 		navigate("/")
	 	}
	 }, [usuario.token])

	return (
		<div className="flex justify-center mx-4">
			<div className="container min-h-[100vh] mx-auto my-4 rounded-2xl overflow-hidden">
				<img
					className="w-full h-72 object-cover border-b-8 border-white"
					src="https://ik.imagekit.io/22g34n0mo/Restaurantes/foodu.jpg?updatedAt=1741200397225"
					alt="Capa do Perfil"
				/>

				<img
					className="rounded-full w-56 mx-auto mt-[-8rem] border-8 border-white relative z-10"
					src= "https://ik.imagekit.io/22g34n0mo/Restaurantes/Captura%20de%20tela%202025-03-05%20155134.png?updatedAt=1741202097438" // src={usuario.foto}
					alt={`Foto de perfil de ${usuario.nome_usuario}`}
				/>

				<div
					className="relative mt-[-6rem] h-72 flex flex-col 
                    bg-[#CD533B] md:h-80  rounded-b-2xl text-white text-2xl items-center justify-center"
				>
					<p>Nome: {usuario.nome_usuario} </p>
					<p>Email: {usuario.usuario}</p>
				</div>
			</div>
		</div>
	)
}

export default Perfil

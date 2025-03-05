function FormProdutos() {
    return (
        <div className="container flex flex-col mx-auto mb-4 items-center">
            <h1 className="text-4xl text-center my-8">Cadastrar Produto</h1>

            <form className="flex flex-col w-1/2 gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Título do Produto</label>
                    <input
                        type="text"
                        placeholder="Titulo"
                        name="titulo"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Preço</label>
                    <input
                        type="text"
                        placeholder="Preço"
                        name="titulo"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Descrição do Produto</label>
                    <input
                        type="text"
                        placeholder="Texto"
                        name="texto"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Foto</label>
                    <input
                        type="text"
                        placeholder="url"
                        name="texto"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <p>Categoria do Produto</p>
                    <select name="tema" id="tema" className='border p-2 border-slate-800 rounded' >
                        <option value="" selected disabled>Selecione uma Categoria</option>
                        
                        <>
                            <option>tema1</option>
                        </>

                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <p>Nutri Score</p>
                    <select name="tema" id="tema" className='border p-2 border-slate-800 rounded' >
                        <option value="" selected disabled>Selecione o Nutri Score</option>
                        
                        <>
                            <option>A</option>
                            <option>B</option>
                            <option>C</option>
                            <option>D</option>
                            <option>E</option>
                        </>

                    </select>
                </div>
                <button 
                    type='submit' 
                    className='rounded disabled:bg-slate-200 bg-[#CD533B] hover:bg-[#EA5A3D]
                               text-white font-bold w-1/2 mx-auto py-2 flex justify-center'
                >
                    Cadastrar
                </button>
            </form>
        </div>
    );
}

export default FormProdutos;
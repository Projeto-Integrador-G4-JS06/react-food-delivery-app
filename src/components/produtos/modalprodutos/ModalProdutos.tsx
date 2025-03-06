import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import FormProdutos from '../formprodutos/FormProdutos';

function ModalProdutos() {
    return (
        <>
            <Popup
                trigger={
                    <button 
                        className='border rounded px-4 py-2 hover:bg-white hover:text-indigo-800'>
                        Novo Produto
                    </button>
                }
                modal
            >
                <FormProdutos />
            </Popup>
        </>
    );
}

export default ModalProdutos;
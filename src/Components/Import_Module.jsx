import React from 'react'
import { importList } from '../index'

export default function Import_Module () {
    return (
        <>
            <button id="import-btn" onClick={importList} className="import-btn text-btn">Importar</button>
            <div id="import-container" className="import--container">
                <textarea id="import-area" className="import-area" name="area para importar listas de compra" placeholder="Pegue aquí su lista de compras generada previamente"></textarea>
                <button id="submit-list-btn" className="text-btn" >Enviar</button>
            </div>
        </>
    )
}
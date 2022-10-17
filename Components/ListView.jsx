import React, { useState } from "react";

function ListView() {
    const [ inputItem, setInputItem ] = useState( { item: '', amount: 1} )
    const [ listItems, setListItems ] = useState( [] )

    function handleChange( event ) {
        const { name, value } = event.target
        setInputItem( prevItem => ( {
            ...prevItem,
            [name]: value
        } ) )
    }
    function addItem( event ) {
        event.preventDefault()
        console.log( inputItem )
    }

    return (
        <main>
            <form>
                <input type='text' name='item' value={ inputItem.item } onChange={ handleChange } placeholder="Elemento a agregar" />
                <input type='number' name='amount' value={ inputItem.amount } onChange={ handleChange } min='1' />
                <button onClick={ addItem } className="add-to-list-btn icon-inside" >
                    <span className="material-symbols-outlined hide">
                        add
                    </span>
                </button>
            </form>
        </main>
    )
}

export default ListView
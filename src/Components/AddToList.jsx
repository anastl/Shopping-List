import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Item from './Item'

export default function AddToList() {

    const [ listItems, setListItems ] = useState( JSON.parse( localStorage.getItem('list') ) || [] )
    const [ inputItem, setInputItem ] = useState( { item: '', amount: 1, isChecked: false } )

    useEffect( () => {
        localStorage.setItem('list', JSON.stringify( listItems ) )
    }, [ listItems ] )

    function handleChange( event ) {
        const { name, value } = event.target
        setInputItem( prevItem => ( {
            ...prevItem,
            [name]: value
        } ) )
    }
    
    function addItem( event ) {
        event.preventDefault()
        ! listItems.find( ( { item } ) => item === inputItem.item.toLowerCase() ) &&
        setListItems( prevItems => {
            const item = inputItem.item.toLowerCase()
            const amount = parseInt( inputItem.amount )
            const isChecked = false
            return [ { item, amount, isChecked }, ...prevItems ]
        } )
        setInputItem( { item: '', amount: 1, isChecked: false } )
    }
    
    function changeAmountFromItem( itemName, operation ) {
        if ( operation === 'delete' ) {
            setListItems( prevItems => prevItems.filter( ( { item } ) => item !== itemName ) )
        }
        else {
            setListItems( prevItems => {
                return prevItems.map( ( { item, amount, isChecked } ) => {
                    if ( item === itemName ) {
                        if ( operation === 'increase' ){
                            amount += 1
                        } 
                        else if ( operation==='decrease' ) {
                            amount -= 1
                        }
                    }
                    return { item, amount, isChecked }
                } )
            } )
            // deletes all elements with 0 as amount
            setListItems( prevItems => prevItems.filter( ( { amount } ) => amount ) )
        }
    }

    function strikeItem( itemStriked ) {
        setListItems( prevList => {
            return prevList.map( ( { item, amount, isChecked } ) => {
                if ( item === itemStriked ) {
                    isChecked = ! isChecked
                }
                return { item, amount, isChecked }
            } )
        } )
    }

    function sortList( event ){
        // setListItems( unorderedList => {
        //     // const 
        // })
    }
    
    const arrayOfItems = listItems.map( ( { item, amount, isChecked } ) => < Item key={ nanoid() } item={ item } amount={ amount } isChecked={ isChecked } onAmountChanged={ changeAmountFromItem } onChecked={ strikeItem } /> )

    return (
        <main>
            <span className="title">Lista de compras</span>
            <form>
                <input onChange={ handleChange } name="item" value={ inputItem.item } placeholder="Elemento a agregar" type="text" aria-label="elemento a agregar" />
                <input onChange={ handleChange } name="amount" value={ inputItem.amount } placeholder="1" min="1" type="number"  aria-label="cantidad de elementos a ser agregados" />
                <button onClick={ addItem } className="add-to-list-btn icon-inside">
                    <span className="material-symbols-outlined hide">
                        add
                    </span>
                </button>
            </form>
            <button onClick={ sortList }>
                <span className="material-symbols-outlined">
                    sort
                </span>
            </button>
            { arrayOfItems.length ? 
                arrayOfItems : 
                ( 
                    <output id="list-container" className="list--container">
                        Ningún elemento ha sido agregado a tu lista de compras
                    </output> 
                ) 
            }
        </main>
    )
}
import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Item from './Item'

export default function AddToList() {

    const [ listItems, setListItems ] = useState( JSON.parse( localStorage.getItem('list') ) || [] )
    const [ inputItem, setInputItem ] = useState( { item: '', amount: 1, isChecked: false } )
    const [ categorySelection, setCategorySelection ] = useState( 'init' )

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
        inputItem.item &&
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
        setListItems( unorderedList => {
            const nonChecked = []
            const checkedItems = [] 
            unorderedList.forEach( ( { item, amount, isChecked } ) => isChecked ? checkedItems.push( { item, amount, isChecked } ) : nonChecked.push( { item, amount, isChecked } ) )
            return [ ...nonChecked, ...checkedItems ]
        })
    }

    function sortSelection( event ){
        setCategorySelection( event.target.value )
        switch ( event.target.value ) {
            case 'create':
                createCategory()
                break;
            case 'delete':
                deleteCategory()
                break;
            case 'merge':
                mergeCategories()
                break;
            case 'move':
                moveElementsToCategory()
                break;
            default:
                break;
        }
    }

    function createCategory() {
        console.log( 'createCategory' )
    }

    function deleteCategory() {
        console.log( 'deleteCategory' )
    }

    function mergeCategories() {
        console.log( 'mergeCategories' )
    }

    function moveElementsToCategory() {
        console.log( 'moveElementsToCategory' )
    }

    
    const arrayOfItems = listItems.map( ( { item, amount, isChecked } ) => < Item key={ nanoid() } item={ item } amount={ amount } isChecked={ isChecked } onAmountChanged={ changeAmountFromItem } onChecked={ strikeItem } /> )

    return (
        <main>
            <span className="title">Lista de compras</span>
            <form>
                <input tabIndex={0} onChange={ handleChange } name="item" value={ inputItem.item } placeholder="Elemento a agregar" type="text" aria-label="elemento a agregar" />
                <input tabIndex={0} onChange={ handleChange } name="amount" value={ inputItem.amount } placeholder="1" min="1" type="number"  aria-label="cantidad de elementos a ser agregados" />
                <button tabIndex={0} onClick={ addItem } className="add-to-list-btn icon-inside">
                    <span className="material-symbols-outlined">
                        add
                    </span>
                </button>
            </form>
            <button tabIndex={0} onClick={ sortList } className='icon-inside'>
                <span className="material-symbols-outlined">
                    sort
                </span>
            </button>
            <select 
            name='category'
            value={ categorySelection }
            onChange={ sortSelection }
            >
                <option value='init'>Más opciones</option>
                <option value='create'>Crear categoría</option>
                <option value='delete'>Eliminar categoría</option>
                <option value='merge'>Combinar categorías</option>
                <option value='move'>Mover elementos de categorías</option>
            </select>

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
import React from "react"
import { callFunction } from "../../index"

export default function Item ( props ) {
    const { item, amount, isChecked, onAmountChanged, onChecked } = props

    function changeAmount( event ) {
        const classOfElement = event.target.className
        const nameIfSpan = event.target.parentNode.parentNode.children[0].textContent
        const nameIfBtn = event.target.parentNode.children[0].textContent
        const functionClassName = classOfElement === 'material-symbols-outlined' ? event.target.parentNode.className.split(' ')[0] : classOfElement.split(' ')[0]
        
        if ( classOfElement === 'material-symbols-outlined' ) {
            onAmountChanged( nameIfSpan, functionClassName )
        } else { // if classOfElement == 'increase icon-inside'
            onAmountChanged( nameIfBtn, functionClassName )
        }
        
        // const itemName =  classOfElement === 'material-symbols-outlined' ? nameIfSpan : nameIfBtn
    }

    return (
        <label htmlFor={item} className="item">
            <span className={ isChecked ? 'name strike' : 'name' }>{ item }</span>
            <span className={ isChecked ? 'amount strike' : 'amount' } aria-valuenow={ amount }>{ amount }</span>
            {/* <span className="amount">{ amount }</span> */}
            <input name={item} id={item} type='checkbox' onChange={ () => onChecked( item ) } checked={ isChecked } />
            <button onClick={ changeAmount } className='delete icon-inside' aria-label="remove from list" >
                <span className="material-symbols-outlined">
                    delete
                </span>
            </button>
            <button onClick={ changeAmount } className='increase icon-inside' aria-label={`increase amount ${ item } by one`} >
                <span className="material-symbols-outlined">
                    add
                </span> 
                </button>                        
            <button onClick={ changeAmount } className='decrease icon-inside' aria-label={`decrease amount ${ item } by one`} >                        
                <span className="material-symbols-outlined">
                    remove
                </span> 
            </button>                                
        </label>
    )
}
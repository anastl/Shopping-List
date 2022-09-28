const item = document.getElementById('item-to-add')
const qtty = document.getElementById('qtty-to-add')
const addBtn = document.getElementById('add-to-list')
const listContainer = document.getElementById('list-container')

let shoppingList = []

class Items {
    constructor ( name, amount ) {
        this.name = name.toLowerCase()
        this.amount = parseInt( amount )
    }
    changeAmount ( operation ) {
        this.amount = operation === 'add' ? this.amount+1 : this.amount-1
    }
    getItemDiv ( ) {
        return (
            `<div class="item" onclick='callFunction( event )'>
                <span class="name">${this.name}</span>
                <span class="amount">${this.amount}</span>
                <span class="material-symbols-outlined delete" aria-label="remove from list">
                    remove_shopping_cart
                </span>
                <span class="material-symbols-outlined increase" aria-label="increase amount of ${this.name} by one">
                    add
                </span> 
                <span class="material-symbols-outlined decrease" aria-label="decrease amount of ${this.name} by one">
                    remove
                </span> 
            </div>`
        )
    }
}

addBtn.addEventListener( 'click', addItem )

function displayList () {
    listContainer.innerHTML = shoppingList.map( item => item.getItemDiv() ).join('')
}

function addItem ( event ) {
    event.preventDefault()
    const newItem = new Items( item.value, qtty.value )
    if ( shoppingList.every( ( { name } ) => name !== newItem.name ) ) {
        shoppingList = [ newItem, ...shoppingList ]
    } else {
        changeQuantity( newItem.name, 'add' )
    }
    item.value = ''
    qtty.value = '1'
    displayList()
}

function deleteItem ( itemName ) {   
    shoppingList = shoppingList.filter( ( { name } ) => name !== itemName )
}

function changeQuantity ( itemName, operation ) {
    shoppingList.forEach( item => {
        if ( item.name === itemName && operation == 'remove' && item.amount == 1 ) {
            deleteItem( itemName )
        }
        else if ( item.name === itemName ) {
            item.changeAmount( operation )
        }
    } )
}

function callFunction ( event ) {
    const className = event.target.className
    const itemName = event.target.parentNode.childNodes[1].textContent
    if ( className == 'material-symbols-outlined delete' ) deleteItem( itemName )
    else if ( className == 'material-symbols-outlined increase' ) changeQuantity( itemName, 'add' )
    else if ( className == 'material-symbols-outlined decrease' ) changeQuantity( itemName, 'remove' )
    displayList()
}
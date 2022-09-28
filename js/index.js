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

const item = document.getElementById('item-to-add')
const qtty = document.getElementById('qtty-to-add')
const popUp = document.getElementById('pop-up')
const addBtn = document.getElementById('add-to-list')
const exportBtn = document.getElementById('export-btn')
const listContainer = document.getElementById('list-container')

let shoppingList = initializeArray()
if ( shoppingList ) displayList()

addBtn.addEventListener( 'click', addItem )
exportBtn.addEventListener( 'click', exportList )
item.addEventListener( 'keydown', pressEnter )
qtty.addEventListener( 'keydown', pressEnter )

async function exportList () {
    try {
        const toBeCopied = JSON.stringify( shoppingList )
        await navigator.clipboard.writeText( toBeCopied )
        popUp.classList.add('slide-in-bottom')
        popUp.style.display = "initial"
        setTimeout( () => { popUp.classList.add('slide-out-bottom') }, 1700 )
        setTimeout( () => {
            popUp.classList.remove('slide-in-bottom')
            popUp.style.display = "none"
        }, 2000)
        popUp.classList.remove('slide-out-bottom')
    } catch ( e ) { console.log( e ) }
}

function pressEnter( event ) {
    if ( event.code === 'Enter' || event.code === 'NumpadEnter' || event.keyCode == 13 ) 
        addItem( event )
}

function initializeArray () {
    const memoryArray = JSON.parse( localStorage.getItem('list') )
    if ( ! memoryArray ) return []
    return memoryArray.map( ( { name, amount } ) => ( new Items( name, amount ) ) )
}

function displayList () {
    if ( shoppingList.length ) {
        listContainer.innerHTML = shoppingList.map( item => item.getItemDiv() ).join('') 
        
        const total = shoppingList.reduce( ( counter, { amount } ) => counter+=amount, 0 )
        const totalSpan = `<span class='total-items'>Total: ${total} elemento${total > 1 ? 's' : ''}</span>`
        listContainer.innerHTML += totalSpan

        localStorage.setItem( 'list', JSON.stringify( shoppingList ) )
    } else {
        listContainer.textContent = 'Ningún elemento ha sido agregado a tu lista de compras'
        localStorage.clear()
    }
}

function addItem ( event ) {
    event.preventDefault()
    if ( item.value === "" || parseInt( qtty.value ) <= 0 || qtty.value === "" ) return
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
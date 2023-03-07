import { menuArray } from "./data.js";


let main = document.querySelector('.main')
let master = document.querySelector('.master')

master += `<div class="cart-h1">Orders</div>`


let cartArray = []


document.addEventListener("click", function (e) {
    if (e.target.dataset.cart) {
        addToCart(e.target.dataset.cart)
        console.log('jdjdjdj')
    }
})

function addToCart(orderId) {
    menuArray.forEach(function (food) {
        if (food.id == orderId) {
            cartArray.push(food.name)
        }
    })
    console.log('hdhdhf')
    console.log(cartArray)
    render()
}



function getFeedHtml() {

    let ingHtml = ''
    let html = ''

    menuArray.forEach(function (item) {

        if (item.ingredients.length > 0) {
            item.ingredients.forEach(function (ing, index) {

                ingHtml += `${ing}${index === item.ingredients.length - 1 ? '' : ','}`

            })
        }

        html += ` 
        
    <div class="feed">
        <section class="item">
            <div class="sec1">
                <div class="img1">
                    <h1>${item.emoji}</h1>
                </div>
                <ul class="item-info">
                    <li class="heading">${item.name}</li>
                    <li class="ing">${ingHtml}<li>
                    <li class="price">$${item.price}</li>
                </ul>
            </div>
            <div class="sec2">
                <i class="fa-solid fa-cart-plus" data-cart='${item.id}'></i>
            </div>
        </section>
    </div>

    <div class="item-border"></div>
    `

        ingHtml = ''
    })



    if (cartArray.length > 0) {
        cartArray.forEach(function (item) {
            master += `
            <div class="orders">
                <div>${item} <span> remove </span></div>
            </div>
            
            `
        })

        html += master
    }

    return html;

}


function render() {
    main.innerHTML = getFeedHtml()
}

render()
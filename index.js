import { menuArray } from "./data.js";


let main = document.querySelector('.main')
let master = document.querySelector('.master')
let overlay = document.querySelector('.popup-overlay')
let payBtn = document.querySelector('.pay-btn')

const myForm = document.getElementById("myForm");
let input1 = document.getElementById('input1')
let input2 = document.getElementById('input2')
let input3 = document.getElementById('input3')




let footer = document.getElementsByTagName('footer')


let cartArray = []


document.addEventListener("click", function (e) {
    if (e.target.dataset.cart) {
        addToCart(e.target.dataset.cart)
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }

    if (e.target.dataset.remove) {
        removeFromCart(e.target.dataset.remove)
    }

    if (e.target.dataset.btn) {
        console.log('btn')
        overlay.style.display = 'block';
    }
})

payBtn.addEventListener("click", function (event) {

    let name = input1.value

    if (!myForm.checkValidity()) {
        event.preventDefault();
        return;
    }



    overlay.style.display = 'none';
    input1.value = ""
    input2.value = ""
    input3.value = ""
    cartArray = []
    render()
    main.innerHTML += ` <div class="end-msg">
                              <h1>Thank you for ordering ${name}</h1>
                        </div>`
})

function addToCart(orderId) {
    master = `<div div class="cart-h1" > Your Order</div > `
    menuArray.forEach(function (food) {
        if (food.id == orderId) {
            cartArray.push([food.name, food.price])
        }
    })
    render()
}

function removeFromCart(ele) {
    const index = cartArray.findIndex(([name, price]) => name === ele.slice(0, -3) && price === parseInt(ele.slice(-2)));
    console.log(index)
    if (index != -1) {
        cartArray.splice(index, 1)
    }

    render()
}


function getFeedHtml() {

    let ingHtml = ''
    let html = ''

    menuArray.forEach(function (item) {

        if (item.ingredients.length > 0) {
            item.ingredients.forEach(function (ing, index) {

                ingHtml += `${ing}${index === item.ingredients.length - 1 ? '' : ', '} `

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

        </div>
                `

        ingHtml = ''
    })



    if (cartArray.length > 0) {
        let totalPrice = 0;
        master = '<div class="cart-h1">Your Order</div>'
        cartArray.forEach(function (item) {
            master += `
            <div class="orders">
                <div class="order-name">${item[0]}      <span class="remove" data-remove="${item}"> remove </span></div>
                <div class="order-price">$${item[1]}</div>
            </div>  
            `

            totalPrice += parseInt(item[1]);
        })

        master += `<div class="border"></div>
                <div class="total">
                    <div class="order-name">Total Price</div>
                    <div class="order-price">$${totalPrice}</div>
                </div>
                <div class="complete-order"><button class="complete-btn" data-btn="btn">Complete order</button></div>

                `



        html += master
    }

    return html;

}




function render() {
    main.innerHTML = getFeedHtml()
}

render()
const item = {
    name: "Avocado",
    type: "fruit",
    category: "food",
    price: 200
}

const applyCoupon = (p) => {

    let {price}= p

    return (discount) => {

        price = price - (price * discount) / 100;

        p.price=price
        
        return p
    }
}

console.log(applyCoupon(item)(10).price)


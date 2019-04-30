const item = {
    name: "Avocado",
    type: "fruit",
    category: "food",
    price: 200
}

const applyCoupon = (p) => {

    return (discount) => {

        p.price = p.price - (p.price * discount) / 100;

        return p
    }
}

console.log(applyCoupon(item)(10).price)


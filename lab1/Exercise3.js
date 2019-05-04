const item = {
    name: "Avocado",
    type: "fruit",
    category: "food",
    price: 200
}

const applyCoupon = (p) => {

    return (discount) => {

        return getDiscountedPrice.call(p,discount)
    }
}

const getDiscountedPrice=function(discount){
    this.price=this.price - (this.price * discount) / 100;
    return this
}

console.log(applyCoupon(item)(10).price)


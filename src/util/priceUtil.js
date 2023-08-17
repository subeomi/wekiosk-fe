

export const formatPrice = (price) => {

  if (typeof price === "number" && !isNaN(price)) {

    return `₩ ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
  } else {

    return 0
  }

}
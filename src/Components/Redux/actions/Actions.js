import {addtocart,removeItem,lengthTell} from "../Constants"
//1.adding items in the cart
export const addTocart = (id,title,price,selectedFile) =>
    ({type:addtocart,id,title,price,selectedFile})
// 3.check for existing items


//2. remove added items in the cart
export const removeItems = (id) =>
({type:removeItem, id})

export const itemsLenght = (length) =>
({type:lengthTell, length})

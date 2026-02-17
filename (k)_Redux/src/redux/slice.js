import { createSlice } from "@reduxjs/toolkit";

const initialState={
    items:localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")) : []
}

const addToCart=createSlice({
    name:"cart",
    initialState,
    reducers:{
        addItem:(state,action)=>{
            console.log("current state",action);
            console.log("Payload received",action.payload);
            state.items.push(action.payload)
            localStorage.setItem("cart",JSON.stringify(state.items))
        },
        removeItem:(state,action)=>{
            const newItems=state.items.filter((item)=>item.id !==action.payload)
            console.log(action.id)
            console.log(action.payload)
            state.items=newItems
            localStorage.setItem("cart",JSON.stringify(newItems))
        },
        clearCart:(state)=>{
            state.items = [];
            localStorage.setItem("cart", JSON.stringify([]));
        },
    }
})

export const {addItem, removeItem, clearCart} = addToCart.actions
export default addToCart.reducer
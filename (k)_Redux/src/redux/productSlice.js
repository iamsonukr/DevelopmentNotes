import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import reducer from "./slice";

export const fetchProducts=createAsyncThunk('products',async()=>{
    const res=await fetch('https://dummyjson.com/products');
    const jsonRes= await res.json();
    return jsonRes.products
})

const initialState={
    items:[],
    state:undefined,
    error:null
}
const productSlice=createSlice({
    name:'productSlice',
    initialState:initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchProducts.fulfilled, (state,action)=>{
            state.state="Succeeded",
            state.items=action.payload
        })
    }
})

export default productSlice.reducer

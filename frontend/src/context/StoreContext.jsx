import { createContext, useEffect, useState } from "react";
export const StoreContext =createContext(null)
import axios from "axios"

const StoreContextProvider = (props) =>{

    const [cartItems,setCartItem] = useState({})
    const [token,setToken] = useState("");
    const [food_list,setFoodList] = useState([]);
    const addToCart = (itemId) =>{
        if(!cartItems[itemId]){
            setCartItem((prev)=>({...prev,[itemId]:1}))
        }else{
            setCartItem((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
    }

    const removeFromCart = (itemId) => {
        setCartItem((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const deleteFromCart = (itemId) => {
        setCartItem((prev)=>({...prev,[itemId]:0}))
    }

    const getTotalCartAmount = () =>{
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = food_list.find((product)=>product._id===item);
                totalAmount +=itemInfo.price* cartItems[item]
            }
        }
        return totalAmount;
    } 

    const fetchFoodList = async() => {
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL+ "/api/food/list");
        setFoodList(response.data.data);
        console.log(response.data.data)
    }

    useEffect(()=>{
        async function loadData() {
            await fetchFoodList()
            if(localStorage.getItem){
                setToken(localStorage.getItem("token"))
            }
        }
        loadData();
    },[])
    const contextValue = {
        food_list,
        cartItems,
        setCartItem,
        addToCart,
        removeFromCart,
        deleteFromCart,
        getTotalCartAmount,
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
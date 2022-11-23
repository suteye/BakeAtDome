const initialState = {
    loading: false,
    cartItems: [],
    totalStoreValue: 0,
    totalProducts: 0,
    outOfStock: 0,
    categories: [],
}


export const rootReducer = (state = initialState, action) => {

const products = action.payload;
const array = []
    switch(action.type) {
        case "SHOW_LOADING":
        return {
            ...state,
            loading: true,
        };
        case "HIDE_LOADING":
        return {
            ...state,
            loading: false,
        };
        case "ADD_TO_CART":
        return {
            ...state,
            cartItems: [...state.cartItems, action.payload]
        };
        case "UPDATE_CART":
        return {
            ...state,
            cartItems: state.cartItems.map(product => product._id === action.payload._id ? {...product, quantity: action.payload.quantity} : product),
        };
        case "DELETE_FROM_CART":
        return {
            ...state,
            //delete the product from the cart by index
            cartItems: state.cartItems.filter((index) => index !== action.payload)
        };
        case "CALC_STORE_VALUE": 
        products.map((item) =>{
            const {price,quantity} = item;
            const productValue = price * quantity;
            return array.push(productValue);
        })
        const totalStoreValue = array.reduce((a,b) => a + b, 0);
        return {
            ...state,
            totalStoreValue: totalStoreValue,
        }; 
        case "CALC_TOTAL_PRODUCTS":
        const totalProducts = products.length;
        return {
            ...state,
            totalProducts: totalProducts,
        };
        case "CALC_OUT_OF_STOCK":
        products.map((item) =>{
            const {quantity} = item;
            return array.push(quantity);
        })
        let count = 0;
        array.forEach((number) => {
            if(number === 0 || number < 0 || number === "0"){
                count+= 1;
            }
        })
        return {
            ...state,
            outOfStock: count,
        };

        case "CHECKOUT":
        return {
            ...state,
            cartItems: [],
        };

    
        default: return state;
    }
}
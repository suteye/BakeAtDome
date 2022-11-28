import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import productService from './productService';
import swal from 'sweetalert2';

const initialState = {
    products: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
    totalStoreValue: 0,
    totalProducts: 0,
    outOfStock: 0,
    categories: [],
}

//create new product
export const createProduct = createAsyncThunk(
    'product/createProduct',
    async (formData, thunkAPI) => {
        try{
           return await productService.createProduct(formData);
        }catch(error){
            const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
              swal.fire({
                    icon: 'error',
                    title: 'มีบางอย่างผิดพลาด',
                    text: message,
                    confirmButtonText: 'retry',
                });
            return thunkAPI.rejectWithValue({message});

        }
    }
);

//get all products
export const getProducts = createAsyncThunk(
    'product/getProducts',
    async (_, thunkAPI) => {
        try{
            return await productService.getProducts();
        }catch(error){
            const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
              swal.fire({
                    icon: 'error',
                    title: 'มีบางอย่างผิดพลาด',
                    text: message,
                    confirmButtonText: 'retry',
                });
            return thunkAPI.rejectWithValue({message});
        }
    }
);


//delete product
export const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
    async (id, thunkAPI) => {
        try{
            return await productService.deleteProduct(id);
        }catch(error){
            const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
              swal.fire({
                    icon: 'error',
                    title: 'มีบางอย่างผิดพลาด',
                    text: message,
                    confirmButtonText: 'retry',
                });
            return thunkAPI.rejectWithValue({message});
        }
    }
);

//update product
export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async ({id,formData}, thunkAPI) => {
        try{
            return await productService.updateProduct(id,formData);
        }catch(error){
            const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
              swal.fire({
                    icon: 'error',
                    title: 'มีบางอย่างผิดพลาด',
                    text: message,
                    confirmButtonText: 'retry',
                });
            return thunkAPI.rejectWithValue({message});
        }
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        CALC_STORE_VALUE: (state, action) => {
            const products = action.payload;
            const array = []
            products.map((item) =>{
                const {price,quantity} = item;
                const productValue = price * quantity;
                return array.push(productValue);
            })
            const totalStoreValue = array.reduce((a,b) => a + b, 0);
            state.totalStoreValue = totalStoreValue;
        },
        CALC_TOTAL_PRODUCTS: (state, action) => {
            const products = action.payload;
            const totalProducts = products.length;
            state.totalProducts = totalProducts;
        },
        CALC_OUT_OF_STOCK: (state, action) => {
            const products = action.payload;
            const array = [];
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
            state.outOfStock = count;
        },
        CALC_CATEGORIES: (state, action) => {
            const products = action.payload;
            const array = [];
            products.map((item) =>{
                const {category} = item;
                return array.push(category);
            })
            const uniqueCategories = [...new Set(array)];
            state.categories = uniqueCategories;
        },
    },
    extraReducers: (builder) => {
        builder
         .addCase(createProduct.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
                state.products.push(action.payload.product);
                swal.fire({
                    icon: 'success',
                    title: 'สร้างสินค้าสำเร็จ',
                    confirmButtonText: 'ตกลง',
                });
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
                swal.fire({
                    icon: 'error',
                    title: 'มีบางอย่างผิดพลาด',
                    text: action.payload.message,
                    confirmButtonText: 'retry',
                });
            })
            .addCase(getProducts.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
                state.products = action.payload.products;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
                swal.fire({
                    icon: 'error',
                    title: 'มีบางอย่างผิดพลาด',
                    text: action.payload.message,
                    confirmButtonText: 'retry',
                });
            })
            .addCase(deleteProduct.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
                state.products = state.products.filter((product) => product._id !== action.payload.id);
                swal.fire({
                    icon: 'success',
                    title: 'ลบสินค้าสำเร็จ',
                    confirmButtonText: 'ตกลง',
                });
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
                swal.fire({
                    icon: 'error',
                    title: 'มีบางอย่างผิดพลาด',
                    text: action.payload.message,
                    confirmButtonText: 'retry',
                });
            })
            .addCase(updateProduct.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
                state.products = state.products.map((product) => {
                    if(product._id === action.payload.product._id){
                        return action.payload.product;
                    }else{
                        return product;
                    }
                })
                swal.fire({
                    icon: 'success',
                    title: 'แก้ไขสินค้าสำเร็จ',
                    confirmButtonText: 'ตกลง',
                });
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
                swal.fire({
                    icon: 'error',
                    title: 'มีบางอย่างผิดพลาด',
                    text: action.payload.message,
                    confirmButtonText: 'retry',
                });
            })
    },
});

export const {CALC_TOTAL_STORE_VALUE, CALC_TOTAL_PRODUCTS, CALC_OUT_OF_STOCK, CALC_CATEGORIES} = productSlice.actions;

export const selectIsLoading = (state) => state.product.isLoading;
export const selectProduct = (state) => state.product.product;
export const selectTotalStoreValue = (state) => state.product.totalStoreValue;
export const selectOutOfStock = (state) => state.product.outOfStock;
export const selectCategory = (state) => state.product.category;

export default productSlice.reducer;
            

        


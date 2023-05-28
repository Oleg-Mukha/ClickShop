import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  productData: [],
  userInfo: null,

  query: "",
  category: "",
  productList: [],
  categories: [],
};

export const clickShopSlice = createSlice({
  name: "clickShop",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.productData.find(
        (item) => item._id === action.payload._id
      );

      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.productData.push(action.payload);
      }
    },
    increamentQuantity: (state, action) => {
      const item = state.productData.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.productData.find(
        (item) => item._id === action.payload._id
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    deleteItem: (state, action) => {
      state.productData = state.productData.filter(
        (item) => item._id !== action.payload
      );
    },
    resetCart: (state) => {
      state.productData = [];
    },

    addUser: (state, action) => {
      state.userInfo = action.payload;
    },
    removeUser: (state) => {
      state.userInfo = null;
    },

    setQuery: (state, action) => {
      console.log("Before reducer: ", state.query);
      state.query = action.payload;
      console.log("After reducer: ", state.query);
    },
    setCategory: (state, action) => {
      console.log("Before reducer: ", state.category);
      state.category = action.payload;
      console.log("After reducer: ", state.category);
    },
    setProductList: (state, action) => {
      state.productList = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const {
  addToCart,
  deleteItem,
  resetCart,
  increamentQuantity,
  decrementQuantity,
  addUser,
  removeUser,

  setQuery,
  setCategory,
  setProductList,
  setCategories,
} = clickShopSlice.actions;

export default clickShopSlice.reducer;

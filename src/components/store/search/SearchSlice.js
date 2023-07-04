import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import productAPI from '../../services/productAPI';
import cateAPI from '../../services/cateAPI';

export const getCategory = createAsyncThunk('search/getCategory', async () => {
  try {
    const response = await cateAPI.getAllCate();
    console.log('lay catetgory');
    if (!!response) {
      return response.category;
    }
  } catch (error) {
    throw console.log(error.response.data, 'day la loi get Category');
  }
});

export const searchByName = createAsyncThunk(
  'search/searchByName',
  async data => {
    try {
      const response = await productAPI.searchByName(data);
      if (!!response) {
        return response;
      }
    } catch (error) {
      console.log(error.response.data, 'day la loi searchByName');
      throw console.log('chua lay duoc san pham');
    }
  },
);
export const searchByCategory = createAsyncThunk(
  'search/searchByCategory',
  async id => {
    try {
      const response = await productAPI.searchByCategory(id);

      if (!!response) {
        return response;
      }
    } catch (error) {
      console.log(error.response.data, 'day la loi searchByCategory');
      throw console.log('chua lay duoc san pham');
    }
  },
);

const SearchSlice = createSlice({
  name: 'search',
  initialState: {
    category: [],
    products: [],
    keyword: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    getCategoryName: (state, action) => {
      state.keyword = action.payload;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(searchByName.fulfilled, (state, action) => {
        state.isLoading = true;
        state.products = action.payload.product;
        state.keyword = action.meta.arg;
        state.error = null;
      })
      .addCase(searchByName.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(searchByCategory.fulfilled, (state, action) => {
        state.isLoading = true;
        state.products = action.payload.product;
        state.error = null;
      })
      .addCase(searchByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.category = action.payload;
        state.error = null;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.error = action.error;
      });
  },
});

export const {getCategoryName} = SearchSlice.actions;
export default SearchSlice.reducer;

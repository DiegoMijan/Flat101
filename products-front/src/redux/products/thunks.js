import { createAsyncThunk } from '@reduxjs/toolkit'
import { HOST_URL, QUERY_GET_PRODUCTS, QUERY_POST_CREATE_PRODUCTS } from '../../fetch/queries';
import { fetchGet, fetchPost } from '../../fetch/config';


export const getAllProducts = createAsyncThunk(
    'products',
  async (thunkApi) => {
    try {
      const response = await fetch(HOST_URL + QUERY_GET_PRODUCTS, fetchGet());
      return response.json();
    } catch (err) {
      throw err;
    }
});

export const postProduct = createAsyncThunk(
  'products/create',
async (productData, thunkApi) => {
  try {
    const response = await fetch(HOST_URL + QUERY_POST_CREATE_PRODUCTS, fetchPost(productData));
    return response.json();
  } catch (err) {
    throw err;
  }
});
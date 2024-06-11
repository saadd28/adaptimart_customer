import axios from "axios";

export const gettopproducts = () => {
  return axios.get("https://adaptimart-backend.vercel.app/api/product/getall");
};

export const getproductsbyname = (ProductName) => {
  const url = `https://adaptimart-backend.vercel.app/api/product/getbyname?name=${ProductName}`;

  return axios.get(url);
};

export const getcategories = () => {
  return axios.get("https://adaptimart-backend.vercel.app/api/category/getall");
};

export const getcategoriesbyname = (CategoryName) => {
  const url = `https://adaptimart-backend.vercel.app/api/category/getbyname?name=${CategoryName}`;

  return axios.get(url);
};

export const adduser = (data) => {
  return axios.post("https://adaptimart-backend.vercel.app/api/account/add", data);
};

export const addorder = (data) => {
  return axios.post("https://adaptimart-backend.vercel.app/api/order/add", data);
};

export const getreviewratingandtotal = (ProductId) => {
  const url = `https://adaptimart-backend.vercel.app/api/review/gettotal?product_id=${ProductId}`;

  return axios.get(url);
};

export const getreviewslistbyproductid = (ProductId) => {
  const url = `https://adaptimart-backend.vercel.app/api/review/getbypid?product_id=${ProductId}`;

  return axios.get(url);
};

export const addreview = (data) => {
  return axios.post("https://adaptimart-backend.vercel.app/api/review/add", data);
};

export const login = (Email, Password) => {
  const url = `https://adaptimart-backend.vercel.app/api/account/login?email=${Email}&password=${Password}`;

  return axios.get(url);
};

export const getcouponbycode = (Code) => {
  const url = `https://adaptimart-backend.vercel.app/api/coupon/getbycode?code=${Code}`;

  return axios.get(url);
};

export const getmbi = (data) => {
  const url = "http://localhost:8002/market_basket_analysis/";

  // Make a GET request with the constructed URL
  return axios.post(url, data);
};

export const getproductbyid = (Id) => {
  const url = `https://adaptimart-backend.vercel.app/api/product/getbyid?id=${Id}`;

  return axios.get(url);
};

import axios from "axios";

export const gettopproducts = () => {
  return axios.get("http://localhost:4000/api/product/getall");
};

export const getproductsbyname = (ProductName) => {
  const url = `http://localhost:4000/api/product/getbyname?name=${ProductName}`;

  return axios.get(url);
};

export const getcategories = () => {
  return axios.get("http://localhost:4000/api/category/getall");
};

export const getcategoriesbyname = (CategoryName) => {
  const url = `http://localhost:4000/api/category/getbyname?name=${CategoryName}`;

  return axios.get(url);
};

export const adduser = (data) => {
  return axios.post("http://localhost:4000/api/account/add", data);
};

export const addorder = (data) => {
  return axios.post("http://localhost:4000/api/order/add", data);
};

export const getreviewratingandtotal = (ProductId) => {
  const url = `http://localhost:4000/api/review/gettotal?product_id=${ProductId}`;

  return axios.get(url);
};

export const getreviewslistbyproductid = (ProductId) => {
  const url = `http://localhost:4000/api/review/getbypid?product_id=${ProductId}`;

  return axios.get(url);
};

export const addreview = (data) => {
  return axios.post("http://localhost:4000/api/review/add", data);
};

export const login = (Email, Password) => {
  const url = `http://localhost:4000/api/account/login?email=${Email}&password=${Password}`;

  return axios.get(url);
};

export const getcouponbycode = (Code) => {
  const url = `http://localhost:4000/api/coupon/getbycode?code=${Code}`;

  return axios.get(url);
};

import axiosClient from './axiosClient';

const userAPI = {
  getAllProduct() {
    const url = '/product/list1';
    return axiosClient.get(url);
  },
  getProduct(id) {
    const url = `/product/${id}`;
    return axiosClient.get(url);
  },
  search(data) {
    const url = `/product/list/name/${data}`;
    return axiosClient.get(url);
  },
  postRegister(data) {
    const url = '/account/register';
    return axiosClient.post(url, data);
  },
  postLogin(data) {
    const url = '/account/login';
    return axiosClient.post(url, data);
  },

  // getAll(params) {
  //   const url = '/user/all';
  //   return axiosClient.get(url, {params}); // chỉ định thêm object config
  // },
  // get(id) {
  //   const url = `/user/${id}`;
  //   return axiosClient.get(url);
  // },
  // add(data) {
  //   const url = '/user/create';
  //   return axiosClient.post(url, data); // post(url,data,objectconfig)
  // },
  // update(data) {
  //   const url = `/user/update`;
  //   return axiosClient.patch(url, data); // or push
  // },
  // remove(data) {
  //   const url = `/user/delete/${data}`;
  // return axiosClient.delete(url);
  // },
};

export default userAPI;

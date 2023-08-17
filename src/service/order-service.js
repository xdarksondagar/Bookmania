import request from "./request";

const ENDPOINT = "api/order";

const placeOrder = async (order) => {
  const url = `${ENDPOINT}`;
  return request
    .post(url, order)
    .then((res) => res)
    .catch((e) => Promise.reject(e));
};

const orderService = { placeOrder };

export default orderService;

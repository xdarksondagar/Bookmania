const { default: axios } = require("axios");
const { toast } = require("react-toastify");

const request = axios.create({
  baseURL: "https://127.0.0.1:5000",
  timeout: 12400000,
  responseType: "json",
});

let requests = [];
let conflictRequest = "";

request.interceptors.request.use(
  async (config) => {
    if (config.headers) {
      config.headers["Content-Type"] = "application/json";
    }

    if (config.headers["isDisableLoader"] !== true) {
      requests.push(config.url);
      showLoader();
    }

    return config;
  },
  (error) => {
    alert(error);
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    let { data } = response;
    removeRequest(response.config.url);

    if (data.code && data.code !== 200) {
      toast.error(
        response.data.error || "Something went wrong, Please try again!"
      );
      return Promise.reject(new Error(data.error || "Error"));
    } else {
      return Promise.resolve(response.data.result);
    }
  },
  (error) => {
    removeRequest(error.config.url);
    toast.error(error.response.data.error || "Something went wrong!!");
    return Promise.reject(error);
  }
);

const removeRequest = (url) => {
  let idx = requests.indexOf(url);
  if (idx >= 0) requests.splice(idx, 1);
  requests.length > 0 ? showLoader() : hideLoader();
  if (url === conflictRequest) {
    conflictRequest = "";
    requests = requests.filter((req) => req !== url);
  }
};

const showLoader = () => document.body.classList.add("loader-open");

const hideLoader = () => document.body.classList.remove("loader-open");

export default request;

import request from "./request";

const ENDPOINT = "api/category";

const getAll = async (params) => {
  let url = `${ENDPOINT}/all`;
  if (params) url = `${ENDPOINT}`;
  return request.get(url, { params }).then((res) => res);
};

const getById = async (id) => {
  const url = `${ENDPOINT}/byId?id=${id}`;
  return request.get(url).then((res) => res);
};

const deleteCategory = async (id) => {
  const url = `${ENDPOINT}?id=id`;
  return request.delete(url).then((res) => res);
};

const save = async (data) => {
  const url = `${ENDPOINT}`;
  if (data.id) {
    return request.put(url, data).then((res) => res);
  } else {
    return request.post(url, data).then((res) => res);
  }
};

const categoryService = { getAll, getById, deleteCategory, save };

export default categoryService;

import request from "./request";

const ENDPOINT = "api/book";

const getAll = async (params) => {
  const url = `${ENDPOINT}`;
  return request.get(url, { params }).then((res) => res);
};

const searchBook = async (searchText) => {
  const url = `${ENDPOINT}/search?keyword=${searchText}`;
  return request.get(url).then((res) => {
    return res;
  });
};

const getById = async (id) => {
  const url = `${ENDPOINT}/byId?id=${id}`;
  return request.get(url).then((res) => res);
};

const deleteBook = async (id) => {
  const url = `${ENDPOINT}?id=${id}`;
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

const bookService = { getAll, getById, searchBook, deleteBook, save };

export default bookService;

import request from "./request";

const ENDPOINT = "api/user";

const getAllUsers = async (params) => {
  const url = `${ENDPOINT}`;
  return request.get(url, { params }).then((res) => res);
};

const getAllRoles = async () => {
  const url = `${ENDPOINT}/roles`;
  return request.get(url).then((res) => res);
};

const getById = async (id) => {
  const url = `${ENDPOINT}/byId?id=${id}`;
  return request.get(url).then((res) => res);
};

const deleteUser = async (id) => {
  const url = `${ENDPOINT}?id=${id}`;
  return request.delete(url).then((res) => res);
};

const update = async (data) => {
  const url = `${ENDPOINT}`;
  return request.put(url, data).then((res) => res);
};

const userService = {
  getAllUsers,
  getAllRoles,
  getById,
  deleteUser,
  update,
};

export default userService;

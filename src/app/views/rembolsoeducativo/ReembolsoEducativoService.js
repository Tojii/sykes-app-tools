import axios from "axios";



export const getRembolsoEducativoById = id => {
  return axios.get("/api/rembolsoEducativo", { data: id });
};
export const deleteRembolsoEducativo = re => {
  return axios.post("/api/rembolsoEducativo/delete", re);
};
export const addRembolsoEducativo = re => {
  return axios.post("/api/rembolsoEducativo/add", re);
};
export const updateRembolso = re => {
  return axios.post("/api/rembolsoEducativo/update", re);
};

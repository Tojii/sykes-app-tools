import axios from 'axios';
const APIURL = "https://sykescr.dev/ToolsViews/api";

export const getLikesDislikes = (data) => {
  return axios.get(`${APIURL + "/LikesDislikes?url=" + data.url + "&module=" + data.module + "&username=" + data.username + "&expirationdays="+ data.expirationDays}`).then(res => res.data);
};

export const addLikesDislikes = (data) => {
   return axios.post(`${APIURL + "/LikesDislikes"}`, data).then(res => res.data);
};
import axios from "axios";
import configureStore from "./Store";
import { createStore } from 'redux';
import apiAuthService from "../services/apiAuthService";
import history from "history.js";
import login from './reducers/LoginReducer';

const store = createStore(login);
const state = store.getState();
console.log("prueba", state)

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

instance.defaults.headers.common['Authorization'] = 'Bearer ' + state.token;

console.log("api",instance.defaults.headers)

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            apiAuthService.logout(); 
            history.state = history.location.pathname;
            history.push({
            pathname: "/session/signin"
            });
        } 
        return Promise.reject(error);
    }
)

//   // Response interceptor for API calls
//   axiosApiInstance.interceptors.response.use((response) => {
//     return response
//   }, async function (error) {
//     const originalRequest = error.config;
//     if (error.response.status === 403 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const access_token = await refreshAccessToken();            
//       axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
//       return axiosApiInstance(originalRequest);
//     }
//     else {
//         setLoading();
//         apiAuthService.logout(); 
//         history.state = history.location.pathname;
//         history.push({
//           pathname: "/session/signin"
//         });
//     }
//     return Promise.reject(error);
//   });

export default instance;



// export function installInterceptors (store) {
//     request.interceptors.response.use(
//       resp => resp.data,
  
//       async error => {
//         /* refresh token and retry request once more on 401
//            else log user out
//         */
//         const {config: originalReq, response} = error
  
//         // skip refresh token request, retry attempts to avoid infinite loops
//         if (originalReq.url !== 'auth/jwt/refresh/' && !originalReq.isRetryAttempt && response && response.status === 401) {
//           try {
//             await store.dispatch('user/refreshToken')
//             originalReq.isRetryAttempt = true
//             originalReq.headers['Authorization'] = request.defaults.headers.common['Authorization']
//             return await request.request(originalReq)
//           } catch (e) {
//             // log user out if fail to refresh (due to expired or missing token) or persistent 401 errors from original requests
//             if (e === 'user has not logged in' || (e.response && e.response.status === 401)) {
//               store.dispatch('user/logout', true)
//             }
//             // suppress original error to throw the new one to get new information
//             throw e
//           }
//         } else {
//           throw error
//         }
//       }
//     )
//   }


// let isRefreshing = false;
//  let failedQueue = [];

//        const processQueue = (error, token = null) => {
//             failedQueue.forEach(prom => {
//                 if (error) {
//                     prom.reject(error);
//                 } else {
//                     prom.resolve(token);
//                 }
//             });

//             failedQueue = [];
//         };

// axios.interceptors.response.use(
//             response => {
//                 return response;
//             },
// err => {
//                 const originalRequest = err.config;

//                 if (err.response.status === 401 && !originalRequest._retry) {
//                     if (isRefreshing) {
//                         return new Promise(function(resolve, reject) {
//                             failedQueue.push({ resolve, reject });
//                         })
//                             .then(token => {
//                                 originalRequest.headers['Authorization'] = 'Bearer ' + token;
//                                 return axios(originalRequest);
//                             })
//                             .catch(err => {
//                                 return Promise.reject(err);
//                             });
//                     }

//                     originalRequest._retry = true;
//                     isRefreshing = true;

//                     return new Promise(function(resolve, reject) {
//                         axios
//                             .post('/fooUrl/refreshToken', {
//                                 refreshToken: "fooToken"})
//                             .then(({ data }) => {
//                                 axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.fooToken;
//                                 originalRequest.headers['Authorization'] = 'Bearer ' + data.fooToken;
//                                 processQueue(null, data.fooToken);
//                                 resolve(axios(originalRequest));
//                             })
//                             .catch(err => {
//                                 processQueue(err, null);
//                                 store.dispatch(showMessage({ message: 'Expired Token' }));

//                                 reject(err);
//                             })
//                             .then(() => {
//                                 isRefreshing = false;
//                             });
//                     });
//                 }

//                 return Promise.reject(err);
//             }
//         );
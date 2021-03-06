import axios from "axios";
import jwtDecode from 'jwt-decode';
import localStorageService from "./localStorageService";

class apiAuthService {

  // Dummy user object just for the demo
  // user = {
  //   userId: "1",
  //   role: 'ADMIN',
  //   displayName: "Jason Alexander",
  //   email: "jasonalexander@gmail.com",
  //   photoURL: "/assets/images/face-6.jpg",
  //   age: 25,
  //   token: "faslkhfh423oiu4h4kj432rkj23h432u49ufjaklj423h4jkhkjh"
  // }

  // You need to send http request with email and passsword to your server in this method
  // Your server will return user object & a Token
  // User should have role property
  // You can define roles in app/auth/authRoles.js
  loginWithEmailAndPassword = (email, password) => {
    const parameters = {
      username: email,
      password: password,
      force: true
    }
    axios.defaults.headers.common["x-api-key"] = `${process.env.REACT_APP_X_API_KEY}`;
    return axios.post(`${process.env.REACT_APP_API_URL}/authenticate`, parameters).then(response => {
      // Login successful
      // Save token
      //console.log("Login", response);
      this.setSession(response.data.token);
      // Set user
      this.setUser(response.data.token);

      return jwtDecode(response.data.token);
    });
  };

  // You need to send http requst with existing token to your server to check token is valid
  // This method is being used when user logged in & app is reloaded
  loginWithToken = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.user);
      }, 100);
    }).then(data => {
      // Token is valid
      this.setSession(data.token);
      this.setUser(data.token);
      return data;
    });
  };

  logout = () => {
    this.setSession(null);
    this.removeUser();
  }

  // Set token to all http request header, so you don't need to attach everytime
  setSession = token => {
    if (token) {
      localStorage.setItem("jwt_token", token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.common["x-api-key"] = `${process.env.REACT_APP_X_API_KEY}`;
    } else {
      localStorage.removeItem("jwt_token");
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  // Save user to localstorage
  setUser = (user) => {    
    localStorageService.setItem("auth_user", user);
  }
  // Remove user from localstorage
  removeUser = () => {
    localStorage.removeItem("auth_user");
  }
}

export default new apiAuthService();
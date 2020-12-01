import axios from "axios";
import localStorageService from "../../services/localStorageService";
export const GET_METRICS = "GET_METRICS";

const config = {
  headers: {
      "x-api-key": '7HNRX-D7KGG-3K4RQ-4WPJ4-YTDFH-F013C',
      "Access-Control-Allow-Origin": 'http://localhost:3000',
      "Authorization": `Bearer ${ localStorageService.getItem('jwt_token') }`
  }
}

export const getMetrics = () => dispatch => {
    const auth_user = localStorageService.getItem('auth_user');
    axios.get(`${process.env.REACT_APP_API_URL}/api/GrowthOpportunity/GetMetrics?badgeId=${auth_user.badgeId}`, config).then(res => {
      dispatch({
        type: GET_METRICS,
        payload: res.data
      });
    });
};


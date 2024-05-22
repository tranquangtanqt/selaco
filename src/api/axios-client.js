import axios from 'axios';
// import queryString from "query-string";

const AxiosClient = axios.create({
  // baseURL: process.env.REACT_APP_API_URL_HEROKU,
  // baseURL: process.env.REACT_APP_API_URL_LOCAL,
  baseURL: process.env.REACT_APP_API_URL_RENDER,
  headers: {
    'content-type': 'application/json',
  },
});

AxiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  config.params = config.params || {};
  return config;
});

AxiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    // Error 😨
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log(error.response);
    } else if (error.request) {
      /*
       * The request was made but no response was received, `error.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */
      console.log(error.request);
    } else {
      // Something happened in setting up the request and triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.message);
  },
);

export default AxiosClient;

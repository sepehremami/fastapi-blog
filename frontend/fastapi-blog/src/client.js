import config from './config';
import jwtDecode from 'jwt-decode';
import * as moment from 'moment';
import {json} from "react-router-dom";

const axios = require('axios');


class FastAPIClient {
  constructor(overrides) {
    this.config = {
      ...config,
      ...overrides,
    };
    this.authToken = config.authToken;

    this.login = this.login.bind(this);
    this.apiClient = this.getApiClient(this.config);
    this.isSperUser = false
  }

  /* ----- Authentication & User Operations ----- */

  /* Authenticate the user with the backend services.
	 * The same JWT should be valid for both the api and cms */
  login(username, password) {
    delete this.apiClient.defaults.headers['Authorization'];

    // HACK: This is a hack for scenario where there is no login form
    const form_data = new FormData();
    const grant_type = 'password';
    const item = {grant_type, username, password};
    for (const key in item) {
      form_data.append(key, item[key]);
    }

    return this.apiClient
        .post('/auth/login', form_data)
        .then((resp) => {
          
          localStorage.setItem('token', JSON.stringify(resp.data));
          return this.fetchUser();
        });
  }

  fetchUser() {
    return this.apiClient.get('/auth/me').then(({data}) => {
      const userData = {...data};
      const userJson = JSON.stringify(userData)
      console.log(userData,userJson)
      if (userData['is_superuser'] == true) {
        this.isSperUser = true;
      }
      localStorage.setItem('user', userJson);
      return userJson;
    });
  }

  register(username, email, password, phone) {
    const registerData = {
      username: username,
      email: email,
      password: password,
      phone: phone,
      is_active: true,
    };

    return this.apiClient.post('/auth/register', registerData).then(
        (resp) => {
          return resp.data;
        });
  }

  // Logging out is just deleting the jwt.
  logout() {
    // Add here any other data that needs to be deleted from local storage
    // on logout
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  /* ----- Client Configuration ----- */

  /* Create Axios client instance pointing at the REST api backend */
  getApiClient(config) {
    const initialConfig = {
      baseURL: `${config.apiBasePath}`,
    };
    const client = axios.create(initialConfig);
    client.interceptors.request.use(localStorageTokenInterceptor);
    return client;
  }

  getPost(recipeId) {
    return this.apiClient.get(`/posts/${recipeId}`);
  }

  getPosts(keyword, limit, skip) {
    return this.apiClient.get(`/posts/search/?skip=${skip}&limit=${limit}&search=${keyword}`).then(({data}) => {
      return data;
    });
  }

  getLatestPosts(limit=10) {
    return this.apiClient.get(`/posts/latest/?num_posts=${limit}`).then(({data}) => {
      return data;
    });
  }

  getRandomPosts(limit) {
    return this.apiClient.get(`/posts/random/?num_posts=${limit}`).then(({data}) => {
      return data;
    });
  }


  getUserPosts() {
    return this.apiClient.get('/posts').then(({data}) => {
      return data;
    });
  }

  createPost(title, description) {
    const recipeData = {
      title,
      description
    };
    return this.apiClient.post(`/posts/`, recipeData);
  }

  deletePost(PostId) {
    return this.apiClient.delete(`/posts/${PostId}`);
  }
};


// every request is intercepted and has auth header injected.
function localStorageTokenInterceptor(config) {
  const headers = {};
  const tokenString = localStorage.getItem('token');

  if (tokenString) {
    const token = JSON.parse(tokenString);
    
    const decodedAccessToken = jwtDecode(token.access_token);
    const isAccessTokenValid =
			moment.unix(decodedAccessToken.exp).toDate() > new Date();
    if (isAccessTokenValid) {
      headers['Authorization'] = `Bearer ${token.access_token}`;
    } else {
      alert('Your login session has expired');
    }
  }
  config['headers'] = headers;
  return config;
}


export default FastAPIClient;

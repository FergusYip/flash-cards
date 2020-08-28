import axios from 'axios';
import _ from 'lodash';

import { url } from './utils/constants';

axios.defaults.baseURL = url;
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';

axios.interceptors.request.use((request) => {
  // if (request.method === 'put' || request.method === 'post' || request.method === 'delete') {
  //     request.data = qs.stringify(request.data);
  // }
  return request;
});

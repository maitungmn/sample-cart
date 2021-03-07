import axios from 'axios';

const buildClient = (headers: any = {}) => axios.create({
  baseURL: process.env.REACT_APP_QUERY_API,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    ...headers,
  },
});

export default buildClient;

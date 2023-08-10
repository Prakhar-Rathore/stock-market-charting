import axios from "axios";
const composeToken = (token) => (token ? { Authorization: ` ${token}` } : {});
const apiCall = (url, method, body = {}, token = "") =>
  axios({
    method,
    url: `${url}`,
    data: body,
    headers: {
      ...composeToken(token),
    },
  });

export default apiCall;

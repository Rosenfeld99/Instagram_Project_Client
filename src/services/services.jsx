import axios from "axios";
import { TOKEN_KEY } from "../constant/url";

export const apiGet = async (_url) => {
  try {
    const data = await axios.get(_url, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": localStorage[TOKEN_KEY],
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const apiPost = async (_url, _bodyData) => {
  console.log(_url);
  console.log(_bodyData);
  try {
    const resp = await axios({
      url: _url,
      data: JSON.stringify(_bodyData),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": localStorage[TOKEN_KEY],
      },
    });
    console.log(resp);
    return resp;
  } catch (err) {
    // console.log(err);
    throw err;
  }
};

// requests of --> POST,PUT,DELETE,PATCH
export const apiMethod = async (_url, _method, _bodyData) => {
  try {
    // console.log(_bodyData);
    const { data } = await axios({
      url: _url,
      method: _method,
      data: _bodyData,
      headers: {
        "x-api-key": localStorage[TOKEN_KEY],
      },
    });
    // console.log(data);
    return data;
  } catch (err) {
    throw err;
  }
};

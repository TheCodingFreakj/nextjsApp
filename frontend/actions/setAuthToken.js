import cookie from "js-cookie";

export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

export const getCookie = (key) => {
  if (process.browser) {
    return cookie.get(key);
  }
};

export const setLocatStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocatStorage = (key, value) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};

//authenticate user by passing the data what you got got in post login axios req while signin
export const authenticate = (data, next) => {
  //console.log(data);

  setCookie("token", data.token);
  setLocatStorage("user", data.user);

  next();
};

export const isAuth = () => {
  if (process.browser) {
    const cookiesChecked = getCookie("token");
    if (cookiesChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};

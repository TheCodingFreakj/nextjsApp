import cookie from "js-cookie";

export const setCookie = (key, value) => {
  if (typeof window !== "undefined") {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

export const removeCookie = (key) => {
  if (typeof window !== "undefined") {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

export const getCookie = (key) => {
  if (typeof window !== "undefined") {
    return cookie.get(key);
  }
};

export const setLocatStorage = (key, value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocatStorage = (key, value) => {
  if (typeof window !== "undefined") {
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
  if (typeof window !== "undefined") {
    const cookiesChecked = getCookie("token");

    // console.log(cookiesChecked);
    if (cookiesChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};

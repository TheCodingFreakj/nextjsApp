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
  // setLocatStorage("customerRole", data.user.customerRole)
  setLocatStorage("user", data.user); //called during signin
  //can use the .role prop to decide where it can login
  //role: 0 -> user dashboard
  //role: 1 -> admin dashboard
  //customer-role -> customer page

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

export const updateUserLocalStorage = (user, next) => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("user")) {
      let auth = JSON.parse(localStorage.getItem("user"));
      auth = user;
      localStorage.setItem("user", JSON.stringify(auth));
    }
  }
};

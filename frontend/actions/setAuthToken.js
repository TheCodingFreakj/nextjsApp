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

//key is the name of the storage
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
  setCookie("token", data.token);
  setLocatStorage("user", data.user);
  next();
};

export const isAuth = () => {
  if (typeof window !== "undefined") {
    const cookiesChecked = getCookie("token");

    if (cookiesChecked) {
      if (localStorage.getItem("user")) {
        try {
          return JSON.parse(localStorage.getItem("user"));
        } catch (error) {
          console.log(error);
          console.error("Not a JSON response");
        }
      } else {
        return false;
      }
    }
  }
};

export const userRole = () => {
  if (typeof window !== "undefined") {
    const cookiesChecked = getCookie("token");
    if (cookiesChecked) {
      if (localStorage.getItem("user")) {
        try {
          const user = JSON.parse(localStorage.getItem("user"));
          if (user.role === 1 || user.role === 0) {
            return user.role;
          } else if (user.customerRole === "consumer") {
            return user.customerRole;
          }
          // console.log("the user", user);
        } catch (error) {
          console.log(error);
          console.error("Not a JSON response");
        }

        //return JSON.parse(localStorage.getItem("user") || "");
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

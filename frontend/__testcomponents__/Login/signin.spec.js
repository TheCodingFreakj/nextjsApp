import React from "react";
import { mount, shallow } from "enzyme";
import axios from "axios";
import { signin } from "../../actions/auth";

describe("testing the sign function and api calls", () => {
  jest.mock("axios");
  it("returns the user data after signup", async () => {
    const user = [
      {
        role: 1,
        name: "Pallavi Priyadarshini",
        email: "pallavidapriya75@gmail.com",
        profile: "http://localhost:3001/profile/e2a199",
        username: "pallavi priyadarshini",
        hashed_password:
          "$2a$10$e5e.HzEUjcv/Hx5rWWJazOUZAMlHSiYD6fZ5c5iNO.LK4G1oILE0O",
        about: "I am senior dev and founder of this company",
      },
    ];
    const resp = { data: user };
    axios.post = jest.fn().mockResolvedValue(resp);

    // or you could use the following depending on your use case:
    // axios.get.mockImplementation(() => Promise.resolve(resp))

    setTimeout(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(data).toEqual(user);
      done();
    }, 0);

    // return signin.all().then((data) => expect(data).toEqual(user));
  });
});

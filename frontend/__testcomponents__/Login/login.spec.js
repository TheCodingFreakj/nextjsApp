import React from "react";
import { mount, shallow } from "enzyme";
import axios from "axios";
import SigninComp from "../../components/SigninComponent";
import { signin } from "../../actions/auth";

describe("<Login /> with no props", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SigninComp />);
  });

  it("should match the snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("has a login input button", () => {
    expect(
      wrapper.containsMatchingElement(
        <input type="submit" className="btn btn-primary " value="Signin" />
      )
    ).toBeTruthy();
  });

  it("has a email input field", () => {
    expect(
      wrapper.containsMatchingElement(<input type="email" />)
    ).toBeTruthy();
  });

  it("has a password input field", () => {
    expect(
      wrapper.containsMatchingElement(<input type="password" />)
    ).toBeTruthy();
  });

  it("renders a email input", () => {
    expect(wrapper.find('input[type="email"]').length).toEqual(1);
  });
  it("renders a password input", () => {
    expect(wrapper.find('input[type="password"]').length).toEqual(1);
  });

  it("renders a submit input", () => {
    expect(wrapper.find('input[type="submit"]').length).toEqual(1);
  });

  it("should respond to change event and change the state of the Login Component", () => {
    wrapper.find('input[type="email"]').simulate("change", {
      target: { name: "email", value: "pallavidapriya75@gmail.com" },
    });
    expect(wrapper.find('input[type="email"]').prop("value")).toEqual(
      "pallavidapriya75@gmail.com"
    );
  });

  it("should respond to change event and change the state of the Login Component", () => {
    wrapper.find('input[type="password"]').simulate("change", {
      target: { name: "password", value: "mypassword" },
    });

    expect(wrapper.find('input[type="password"]').prop("value")).toEqual(
      "mypassword"
    );
  });

  it("when the form is submiited the event is cancelled", () => {
    wrapper = shallow(<SigninComp signupForm={() => {}} />);
    let prevented = false;
    wrapper.find("form").simulate("submit", {
      preventDefault: () => {
        prevented = true;
      },
    });
    expect(prevented).toBeTruthy();
  });

  test("Should call onSubmit prop for valid form submission", () => {
    const data = {
      email: "pallavidapriya75@gmail.com",
      password: "mypassword",
    };
    const onSubmitSpy = jest.fn();
    const formEventMocked = { preventDefault: jest.fn() };
    //the data that is passed in to the form through the data variable
    //then passed to the onSubmit function when the form is submitted
    wrapper = shallow(<SigninComp data={data} onSubmit={() => onSubmitSpy} />);
    wrapper.find("form").simulate("submit", formEventMocked);
    setTimeout(() => {
      expect(onSubmitSpy).toBeCalledTimes(1);
      expect(onSubmitSpy).toHaveBeenLastCalledWith({
        email: data.email,
        password: data.password,
      });
      done();
    }, 0);
  });
});

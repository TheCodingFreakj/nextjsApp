//This code will run also before each test but after the testing framework gets executed:
// import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
// require("enzyme").configure({ adapter: new Adapter() });

import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
// jest.setup.js
import { setConfig } from "next/config";
import { publicRuntimeConfig } from "./next.config";

// Make sure you can use "publicRuntimeConfig" within tests.
setConfig({ publicRuntimeConfig });

configure({
  adapter: new Adapter(),
});
//will be executed

//after the test framework has been installed in the environment.
//how to make sure to run publicRuntimeConfig within tests

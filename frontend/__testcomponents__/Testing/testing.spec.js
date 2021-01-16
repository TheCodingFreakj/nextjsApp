import React from "react";
import { mount, shallow } from "enzyme";
const myObj = {
  doSomething() {
    console.log("does something");
  },
};

// class ExpenseForm extends React.Component {
//   constructor(props) {
//     super();
//     this.state = {
//       description: props.expense ? props.expense.description : "",
//       note: props.expense ? props.expense.note : "",
//       amount: props.expense ? (props.expense.amount / 100).toString() : "",
//       createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
//       calendarFocused: false,
//       error: "",
//     };
//   }
//   onDescriptionChange = (e) => {
//     const description = e.target.value;
//     this.setState(() => ({
//       description,
//     }));
//   };
//   onNoteChange = (e) => {
//     const note = e.target.value;
//     this.setState(() => ({
//       note,
//     }));
//   };
//   onAmountChange = (e) => {
//     const amount = e.target.value;
//     if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
//       this.setState(() => ({ amount }));
//     }
//   };
//   onSubmit = (e) => {
//     e.preventDefault();

//     if (!this.state.description || !this.state.amount) {
//       this.setState(() => ({
//         error: "Please provide description and amount.",
//       }));
//     } else {
//       this.setState(() => ({ error: "" }));
//       this.props.onSubmit({
//         description: this.state.description,
//         amount: parseFloat(this.state.amount, 10) * 100,
//         note: this.state.note,
//       });
//     }
//   };
//   render() {
//     return (
//       <div>
//         {this.state.error && <p>{this.state.error}</p>}
//         <form onSubmit={this.onSubmit}>
//           <input
//             type="text"
//             placeholder="Description"
//             autoFocus
//             value={this.state.description}
//             onChange={this.onDescriptionChange}
//           />
//           <textarea
//             placeholder="Add a note for your expense (optional)"
//             value={this.state.note}
//             onChange={this.onNoteChange}
//           />
//           <input
//             type="text"
//             placeholder="Amount"
//             value={this.state.amount}
//             onChange={this.onAmountChange}
//           />
//           <button>Add Expense</button>
//         </form>
//       </div>
//     );
//   }
// }

describe("call the function", () => {
  test("stub .toBeCalled()", () => {
    const stub = jest.fn();
    stub();
    expect(stub).toBeCalled();
  });

  test("spyOn .toBeCalled()", () => {
    const somethingSpy = jest.spyOn(myObj, "doSomething");
    myObj.doSomething();
    expect(somethingSpy).toBeCalled();
  });
  //https://codewithhugo.com/jest-fn-spyon-stub-mock/
  //https://pawelgrzybek.com/mocking-functions-and-modules-with-jest/

  test("Should identify if the spy function was called or not", () => {
    //If we make a call to the function before the assertion the test will pass
    //What this means is that we can pass the spy function in to a component to override an existing property.
    const spyFunction = jest.fn();
    spyFunction();
    expect(spyFunction).toHaveBeenCalled();
  });

  //we test to make sure that when a form component is submitted the onSubmit function is called and the correct data is passed to it.
  //shallow generate an instance of an ExpenseForm component
  //pass the onSubmitSpy function in as the onSubmit prop which is linked in the component to the onSubmit event of the form.
});

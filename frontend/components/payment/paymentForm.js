const React = require("react");
var createReactClass = require("create-react-class");
const ReactScriptLoaderMixin = require("react-script-loader")
  .ReactScriptLoaderMixin;

const PaymentForm = createReactClass({
  mixins: [ReactScriptLoaderMixin],

  getInitialState: function () {
    return {
      stripeLoading: true,
      stripeLoadingError: false,
      submitDisabled: false,
      paymentError: null,
      paymentComplete: false,
      token: null,
    };
  },

  getScriptURL: function () {
    return "https://js.stripe.com/v2/";
  },

  onScriptLoaded: function () {
    if (!PaymentForm.getStripeToken) {
      // publishable key here
      Stripe.setPublishableKey(
        "pk_test_51HaLO5GERwFTkr9G4zOzmAbJmqkiO51f25Nk3gpg8FIlkbFK3QCtc1GF1Kv75TBzVUROT7NVHoS3QHXUf5gUvQmg00SYpumSjq"
      );
      this.setState({ stripeLoading: false, stripeLoadingError: false });
    }
  },

  onScriptError: function () {
    this.setState({ stripeLoading: false, stripeLoadingError: true });
  },
  onSubmit: function (event) {
    var self = this;
    event.preventDefault();
    this.setState({ submitDisabled: true, paymentError: null });
    // send form here
    Stripe.createToken(event.target, function (status, response) {
      if (response.error) {
        self.setState({
          paymentError: response.error.message,
          submitDisabled: false,
        });
      } else {
        self.setState({
          paymentComplete: true,
          submitDisabled: false,
          token: response.id,
        });
        // make request to your server here!
      }
    });
  },

  render: function () {
    if (this.state.stripeLoading) {
      return <div>Loading</div>;
    } else if (this.state.stripeLoadingError) {
      return <div>Error</div>;
    } else if (this.state.paymentComplete) {
      return <div>Payment Complete!</div>;
    } else {
      return (
        <form onSubmit={this.onSubmit}>
          <span>{this.state.paymentError}</span>
          <br />
          <input
            type="text"
            data-stripe="number"
            placeholder="credit card number"
          />
          <br />
          <input
            type="text"
            data-stripe="exp-month"
            placeholder="expiration month"
          />
          <br />
          <input
            type="text"
            data-stripe="exp-year"
            placeholder="expiration year"
          />
          <br />
          <input type="text" data-stripe="cvc" placeholder="cvc" />
          <br />
          <input
            disabled={this.state.submitDisabled}
            type="submit"
            value="pay"
          />
        </form>
      );
    }
  },
});

export default PaymentForm;
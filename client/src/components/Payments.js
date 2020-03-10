// This is for configuring react-stripe-checkout
// This is a wrapper for that
import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="Email-Feedback"
        description="Use 4242-4242-4242-4242 as dummy credit card! "
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}
export default connect(
  null,
  actions
)(Payments);

import React, { Component } from "react";
import { connect } from "react-redux";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
        break;
      case false:
        return (
          <li>
            <a href="/auth/google">Login with Google</a>
          </li>
        );
        break;
      default:
        return (
          <li>
            <a href="/api/logout">logout</a>
          </li>
        );
    }
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a className="left brand-logo">Email-Feedback</a>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}
function mapStateToProps({ auth }) {
  return { auth };
}
export default connect(mapStateToProps)(Header);

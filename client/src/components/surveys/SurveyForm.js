import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField";

const FIELDS = [
  {
    label: "Survey Title",
    name: "title",
    noValueError: "* You must provide the title"
  },
  {
    label: "Subject Line",
    name: "subject",
    noValueError: "You must provide the subject"
  },
  {
    label: "Email Body",
    name: "body",
    noValueError: "* You must provide the body"
  },
  {
    label: "Recipient List",
    name: "emails",
    noValueError: "* You must provide at least one email"
  }
];

class SurveyForm extends Component {
  renderFields() {
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

// is validate a built-in function? - probably yes
function validate(values) {
  const errors = {};

  // No value error
  _.each(FIELDS, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });
  return errors;
}

export default reduxForm({
  validate,
  form: "surveyForm"
})(SurveyForm);

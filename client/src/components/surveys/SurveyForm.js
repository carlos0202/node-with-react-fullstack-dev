//SurveyForm is the component that receives user input in the form
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import { Link } from "react-router-dom";
import _ from "lodash";
import validateEmails from "../../utils/validateEmails";
import FIELDS from "./formFields";

class SurveyForm extends Component {
  renderFields() {
    return _.map(FIELDS, field => {
      const { label, name } = field;
      return (
        <Field key={field.name} id={field.name} name={name} inputLabel={label} component={SurveyField} type="text" />
      );
    });
  }

  render() {
    return (
      <div className={this.props.className} id={this.props.id}>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <div className="row">
            <div className="col s12">
              <Link to="/surveys" className="red btn-flat left white-text">Cancel</Link>
              <button type="submit" className="teal btn-flat right white-text">
                Submit
                <i className="material-icons right">done</i>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function validate(values){
  const errors = {};
  //all fields are required
  _.each(FIELDS, ({label, name}) => {
    if(!values[name]){
      errors[name] = `${label} field must have a value`;
    }
  });
  
  errors.recipients = errors.recipients || validateEmails(values.recipients);

  return errors;
}

export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false
})(SurveyForm);

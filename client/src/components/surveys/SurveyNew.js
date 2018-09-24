//SurveyNew is a wrapper for SurveyForm and SurveyReview
import React, { Component } from "react";
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

class SurveyNew extends Component {
  state = { showFormReview: false };

  render() {
    return (
      <div className="row">
        <div className="col s12">
          <div className="card" style={{ padding: "10px" }}>
            <div className="card-title center-align">
              <span className="card-title">
                {this.state.showFormReview !== true ? "Create new Survey" : "Review input Data"}
              </span>
            </div>
            {this.state.showFormReview !== true ? (
              <SurveyForm className="card-content" onSurveySubmit={() => this.setState({ showFormReview: true })} />
            ) : (
              <SurveyFormReview onCancel={() => this.setState({ showFormReview: false })} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);

//SurveyField contains logic to render a label and text input
import React from "react";

export default ({ input, meta:{ error, touched }, ...props }) => {

  return (
    <div className="row" style={{ marginBottom: "20px" }}>
      <div className="col s12">
        <label htmlFor={props.id}>{props.inputLabel}</label>
        <input {...input} id={props.id} name={props.id} type="text" className="validate" style={{ marginBottom: "5px" }} />
        <div className="red-text">
        {touched && error}
        </div>
      </div>
    </div>
  );
};

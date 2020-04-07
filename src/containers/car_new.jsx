import React, { Component } from 'react';

import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { createCar } from '../actions';

class CarNew extends Component {
  onSubmit = (values) => {
    this.props.createCar(this.props.garage, values, () => {
      this.props.history.push('/');
    });
  }

  render (props) {

    const requiredField = (value) => {
      value ? undefined : 'Required';
    };

    const licensePlate = (value) => {
      value && /[A-Z]{2}-[A-Z]{2}-[A-Z]{2}/i.test(value) ? 'invalid plate' : undefined
    };
    const renderField = ({ input, label, type, placeholder, meta: { touched, error, warning } }) => (
      <div>
        <label>{label}</label>
        <div>
          <input {...input} placeholder={placeholder} type={type} className='form-control' />
          {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
      </div>
    );

    const { submitting } = false;
    return [
      <div key="add" className="form-container car-form">
        <div id="page-title">
          <h1> Create a new Car in {this.props.garage} garage </h1>
        </div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <div className="form-group">
            <Field
              label="Brand"
              name="brand"
              type="text"
              placeholder="Fiat"
              component={renderField}
              className="form-control"
              validate={requiredField}

            />
          </div>
          <div className="form-group">
            <Field
              label="Model"
              name="model"
              type="text"
              placeholder="Fiat Punto"
              component={renderField}
              className="form-control" />
          </div>
          <div className="form-group">
            <Field
              label="Owner"
              name="owner"
              type="text"
              placeholder="Cristiano Ronaldo"
              component={renderField}
              className="form-control" />
          </div>
          <div className="form-group">
            <Field
              label="Plate"
              name="plate"
              type="text"
              validate={requiredField && licensePlate}
              placeholder="64-EX-23"
              component={renderField}
              className="form-control" />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >Add car</button>
        </form>
      </div>
    ];
  }
}


function mapStateToProps(state) {
  return {
    garage: state.garage
  };
}

export default reduxForm({ form: 'newCarForm' })(
  connect(mapStateToProps, { createCar })(CarNew)
);

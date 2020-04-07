import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCars } from '../actions/index';

class CarsIndex extends Component {
  componentDidMount() {
    this.props.fetchCars(this.props.garage);
  }
  renderCars() {
    return this.props.cars.map((car) => {
      return (
        <div className="car-card" key={car.id}>
          <p> {car.brand}</p>
        </div>
      );
    });
  }


  render() {
    return (
      <div className="container">
        <div className="garage-infocard card col-sm-3">
          <h2 className="col-sm-12">{this.props.garage}</h2>

        </div>
        <div className="garage-cars-container card col-sm-8">
          <h2 className="col-sm-12">My cars: </h2>
          <div className="garage-cars col-sm-12">
            {this.renderCars()}
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCars }, dispatch);
}


function mapStateToProps(state) {
  return {
    cars: state.cars,
    garage: state.garage
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CarsIndex);

import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";


import './Slider.css';

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }
  handleSelect = (selectedIndex, e) => {
    this.setState({
      index: selectedIndex,
    });
    this.props.currentOption(selectedIndex);
  };
  render() {
    

    

    let mapper = (el) => {
      return (
        <Carousel.Item key={el.id}>
          
        <div className="svg-image">

            <img className="d-block justify-content-md-center" id="svg-image" src={el.url} alt="slide"  />
        </div>
        
          <Carousel.Caption>
            <h3>{el.category}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      );
    };
    let carouselOptions = this.props.options.map(mapper);

    return (
      <div>
        <Carousel
          className="w-40"
          pause="hover"
          activeIndex={this.state.index}
          onSelect={this.handleSelect}
          interval="1000000"
        >
          {carouselOptions}
        </Carousel>
      </div>
    );
  }
}

export default Slider;

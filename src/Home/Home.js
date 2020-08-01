import React, { Component } from "react";
import "./Home.css";
import Slider from '../Slider/Slider';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';

class Home extends Component {
  currentCategory = (option) => {
    this.props.currentCategory(option);
  }
  currentDifficulty = (option) => {
    this.props.currentDifficulty(option);
  }
  render() {
    
    return (
      <div className="home">
        <h1>Trivia!</h1>
        <h3>The choice is yours.</h3>
        
        <div className="choice">
          <div className="category-choice">
            <h4>Category</h4>
            <Slider options={this.props.options} currentOption={this.currentCategory}/>
          </div>
          <div className="barricade">

          </div>
          <div className="difficulty-choice">
            <h4>Difficulty</h4>
            <Slider options={this.props.difficulty} currentOption={this.currentDifficulty} />
          </div>
        </div>
        <h4>Start new game</h4>
        <Link to='/app'>
          <button className='new-game-button'>New Game!</button>
        </Link>
      </div>
    );
  }
}

export default Home;

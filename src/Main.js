import React,{Component} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import App from './App';
import Home from './Home/Home';

//categories
import gk from './categories/undraw_questions_75e0.svg';
import netflix from './categories/undraw_netflix_q00o.svg';
import Art from './categories/undraw_artist_b4rc.svg';
import Politics from './categories/undraw_candidate_ubwv.svg';

//difficulties
import Easy from './difficulties/undraw_toy_car_7umw.svg';
import Medium from './difficulties/undraw_junior_soccer_6sop.svg';
import Hard from './difficulties/undraw_basketball_agx4.svg';
import Any from './difficulties/undraw_target_kriv.svg';

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            category:0,
            difficulty:0
        }
    }
    currentCategory = (option) => {
      this.setState({
        category:option
      })
      
    }
    currentDifficulty = (option) => {
      this.setState({
        difficulty:option
      })
    }
    categoryPasser = (arr,id) => {
      let choice;
      choice = arr.filter(el =>{
          return el.id === id
      })
      return choice;
    }
    render(){
      let difficulty = [
        {
          id: 0,
          category: "Any",
          url:Any,
          namespace:""
        },
        {
          id: 1,
          category: "Easy",
          url:Easy,
          namespace:"easy"
        },
        {
          id: 2,
          category: "Medium",
          url:Medium,
          namespace:"medium"
            // "https://image.freepik.com/free-photo/portrait-delivery-man-carrying-packages_23-2148590734.jpg",
        },
        {
          id: 3,
          category: "Hard",
          url:Hard,
          namespace:"hard"
            // "https://image.freepik.com/free-photo/front-view-businessman-holding-high-tech-tablet_23-2148598110.jpg",
        }
        
      ];
      let options = [
        {
          id: 0,
          category: "General Knowledge",
          number: 17,
          url:gk
        },
        {
          id: 1,
          category: "Entertainment",
          number: 18,
          url:netflix
            // "https://image.freepik.com/free-photo/portrait-delivery-man-carrying-packages_23-2148590734.jpg",
        },
        {
          id: 2,
          category: "Art",
          number: 19,
          url:Art
            // "https://image.freepik.com/free-photo/front-view-businessman-holding-high-tech-tablet_23-2148598110.jpg",
        },
        {
          id: 3,
          category: "Politics",
          number: 20,
          url:Politics
        },
      ];
      
     
      
        return (
            <Router>
              <div>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/app">App</Link>
                  </li>
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                </ul>
        
                <hr />
        
                {/*
                  A <Switch> looks through all its children <Route>
                  elements and renders the first one whose path
                  matches the current URL. Use a <Switch> any time
                  you have multiple routes, but you want only one
                  of them to render at a time
                */}
                <Switch>
                  <Route exact path="/">
                    <Home options={options} difficulty={difficulty} currentCategory={this.currentCategory} currentDifficulty={this.currentDifficulty}/>
                  </Route>
                  <Route path="/app">
                    <App chosenCategory={this.categoryPasser(options,this.state.category)} chosenDifficulty={this.categoryPasser(difficulty,this.state.difficulty)}/>
                  </Route>
                  <Route path="/dashboard">
                    <Dashboard />
                  </Route>
                </Switch>
              </div>
            </Router>
          );
        
    }
}

// You can think of these components as "pages"
// in your app.




function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

export default Main;
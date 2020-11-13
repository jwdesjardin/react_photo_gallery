import './App.css';
import React, { Component } from 'react';
import Search from './components/Search';
import Nav from './components/Nav';
import PhotoContainer from './components/PhotoContainer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from './components/NotFound';



class App extends Component {
  // state = {
  //   photos: {}
  // }
  

  render(){
    return (
      <BrowserRouter>
        <div className="container">
          <Search />
          <Nav />
          <Switch>
            <Route exact path='/' render={ () => <h1>HOME PAGE!!</h1> } />
            <Route exact path="/search/:term" component={ (props) => <PhotoContainer term={props.match.params.term} />} />
            <Route component={NotFound} />
           </Switch> 
        </div>
      </BrowserRouter>
    );
  }
  
}

export default App;

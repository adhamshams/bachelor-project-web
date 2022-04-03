import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUp from './screens/SignUp';
import Complete from './screens/Complete';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={HomeScreen} />
        <Route exact path='/login' component={LoginScreen} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/profile/complete' component={Complete} />
      </Switch>
    </Router>
  );
}

export default App;

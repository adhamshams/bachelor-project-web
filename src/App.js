import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUp from './screens/SignUp';
import Complete from './screens/Complete';
import Profile from './screens/Profile';
import Vitals from './screens/Vitals';
import Symptoms from './screens/Symptoms';
import ReportSymptoms from './screens/ReportSymptoms';
import Doctors from './screens/Doctors';
import Messages from './screens/Messages';
import DoctorProfile from './screens/DoctorProfile';
import DoctorMessages from './screens/DoctorMessages';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={HomeScreen} />
        <Route exact path='/login' component={LoginScreen} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/profile/complete' component={Complete} />
        <Route exact path='/profile/home' component={Profile} />
        <Route exact path='/profile/vitals' component={Vitals} />
        <Route exact path='/profile/symptoms' component={Symptoms} />
        <Route exact path='/profile/doctors' component={Doctors} />
        <Route exact path='/profile/messages' component={Messages} />
        <Route exact path='/doctor/home' component={DoctorProfile} />
        <Route exact path='/doctor/messages' component={DoctorMessages} />
        <Route exact path='/report/symptoms' component={ReportSymptoms} />
      </Switch>
    </Router>
  );
}

export default App;

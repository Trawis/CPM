import React from 'react';
import { Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { Home } from './home';
import { Cars } from './cars';
import { Employees } from './employees';
import { CarEmployees } from './carEmployees';
import { TravelPlans } from './travelPlans';
import { Layout } from './navigation';

function App() {
  return (
    <Router>
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/cars' component={Cars} />
        <Route path='/employees' component={Employees} />
        <Route path='/caremployees' component={CarEmployees} />
        <Route path='/travelplans' component={TravelPlans} />
      </Layout>
    </Router>
  );
}

export default App;
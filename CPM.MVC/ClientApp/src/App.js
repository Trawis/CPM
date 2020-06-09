import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components';
import { Home, Cars, Employees, CarEmployees, TravelPlans } from './views';

export default class App extends Component {
    displayName = App.name

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/cars' component={Cars} />
                <Route path='/employees' component={Employees} />
                <Route path='/caremployees' component={CarEmployees} />
                <Route path='/travelplans' component={TravelPlans} />
            </Layout>
        );
    }
}

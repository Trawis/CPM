import React from 'react';
import { Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { Home } from './home';
import { Cars } from './cars';
import { Layout } from './navigation';

function App() {
  return (
    <Router>
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/cars' component={Cars} />
      </Layout>
    </Router>
  );
}

export default App;
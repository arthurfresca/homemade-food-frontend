import React from 'react';
import { Provider } from 'react-redux';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import store from './store';

// App Components
import Header from './components/template/header/Header';
import Footer from './components/template/footer/Footer';
import MyTaxi from './components/page/myTaxi/MyTaxi';
import Car2Go from './components/page/car2go/Car2Go';
import NotFound from './components/page/pageNotFound/Error404';

// Global CSS styles
import './assets/styles/style.css';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/" component={MyTaxi} />
            <Route exact path="/car2go" component={Car2Go} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  </Provider>
);

export default App;

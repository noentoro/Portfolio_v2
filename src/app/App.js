import React from "react";
import {RouteHandler} from "./Routes";

import {Provider} from 'react-redux';
import {fetchLoggedInUserData} from './actions';
import {AUTH_USER} from './actions/types.js';

import './App.css';

export default function App({}) {



   return (
      <div className="App">
        <RouteHandler/>

      </div>

  );
}

import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/Layout";


const app = document.getElementById('app');

ReactDOM.render( <Router><Layout /></Router>, app);



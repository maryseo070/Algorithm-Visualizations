import * as d3 from "d3";
import React from 'react';
import ReactDOM from 'react-dom';


  var D3 = require("d3"),
      jsdom = require("jsdom");

  var document = jsdom.jsdom(),
      svg = D3.select(document.body).append("svg");

# ClassMap

> Class definition utility for ReactJS

![travisCI](https://travis-ci.org/marcopeg/class-map.svg?branch=master)
[![npm version](https://img.shields.io/npm/v/class-map.svg?style=flat-square)](https://www.npmjs.com/package/class-map)


## Install & Setup

	npm install --save class-map
	
Use it for setting up the `className` property of a React component:
	
	import React from 'react';
	import { ClassMap } from 'class-map';
	
	export class MyComponent extends React.Component {
	  render() {
	  
	  	// create the class map:
	    var map = new ClassMap({
	      'btn': true,
	      'btn-primary': this.props.isPrimary
	    });
	    
	    return (
	      <a className={map}>I am a primary button</a>
	    );
	  }
	}
	
For more examples please refer to the test cases.
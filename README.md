# ClassMap

Class definition utility for ReactJS

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
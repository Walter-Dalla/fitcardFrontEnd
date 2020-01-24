import React, { Component }  from 'react';

import "../../img/7.jpg";
import "../../css/font-awesome.min.css";
import "../../css/bootstrap.min.css";
export default class Head extends Component{


render(){
return(<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title>FitCard - {this.props.page}</title>
  
  </head>);

  }
}
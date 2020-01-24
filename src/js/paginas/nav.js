import React, { Component }  from 'react';
import "../../css/css.css"
import '../../css/nav/nav.css'

export default class Nav extends Component{

    constructor(props){
        super(props);
        this.state = {
            tela:{
                galeria: '',
                services:'',
                home:'',
                contact:'',
                about:'',
                home:'',
                login:'',
                estabelecimento:''
            }
        }
    }

    componentDidMount(){
        if(this.props.tela === undefined || this.state.tela[this.props.tela])
            return ''
        this.setState({
            [this.props.tela]:"active"
        })
    }

    render(){
        return (
            <header id="header">
    <nav className="navbar navbar-default navbar-static-top" role="banner">
      <div className="container">
        <div className="navbar-header">
          <div className="navbar-brand">
            <a href="/"><h1>Project: FitCard GitHub</h1></a>
          </div>
        </div>
        <div className="navbar-collapse collapse">
          <div className="menu">
            <ul className="nav nav-tabs" role="tablist">
              <li role="presentation"><a href="/" className={this.state.home}>Home</a></li>
              <li role="presentation"><a href="equipe" className={this.state.services}>A Equipe</a></li>
              <li role="presentation"><a href="login" className={this.state.login}>Login</a></li>
              <li role="presentation"><a href="estabelecimento" className={this.state.estabelecimento}>Estabelecimento</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>
        );

        
    }


}
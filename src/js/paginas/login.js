import React, { Component }  from 'react';

import Head from "./head.js";
import Nav from "./nav.js";
import { browserHistory } from 'react-router/lib';
import CadastroModel from '../components/modal/CadastrarModal'

import '../../css/login/login.css'

export default class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            credenciais:{

            },
            modalOpen:false
        }
        this.login = this.login.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.openModalCadastar = this.openModalCadastar.bind(this);
        
    }

    async login(event){
        event.preventDefault();

        let url = this.props.url;
        let path = '/login';

        const payload = {
            method: 'POST',
            headers: new Headers({
                'Content-type':'application/json'
            }),
            body:JSON.stringify(this.state.credenciais),
        };
        
        fetch(url + path, payload)
        .then(response =>{
            if(response.ok)
                return response.json();
            else
                throw new Error('Erro ocorreu');
        })
        .then(resp =>
            {
                localStorage.setItem('auth-token', resp.token);
                browserHistory.push(
                    '/estabelecimento'
                );
            }

        ).catch(ex =>{
            console.log(ex);
        })
    }

    handleOnChange(event){
        const valor = event.target.value;
        const key = event.target.id;
        const credenciais = this.state.credenciais;

        this.setState({
            credenciais:{
                ...credenciais,
                [key]:valor,
            }
        })
    }

    handleClose(){
        this.setState({
            modalOpen: false
        });

    }

    openModalCadastar(){
        this.setState({
            modalOpen: true
        })
    }

    render(){
        return (
            <html lang="en">
            <Head/>
            <body>
            <Nav tela="Login"/>

                <section className="login">
                    <div className="container">
                    <div className="text-center">
                        <h2>Login</h2>
                        <p className="cadastrar" onClick={this.openModalCadastar}>Cadastre-se</p>
                    </div>
                    <div className="row contact-wrap">
                        <div className="col-md-6 col-md-offset-3">
                        <form onSubmit role="form" className="contactForm">
                            <div className="form-group">
                                <input type="text" name="name ou e-mail" className="form-control" id="nomeLogin" placeholder="name ou e-mail" data-rule="minlen:4"
                                    data-msg="Please enter at least 4 chars" onChange={this.handleOnChange}/>
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" name="password" id="senhaLogin" placeholder="Sua senha" data-rule="minlen:4"
                                    data-msg="Digite sua senha" onChange={this.handleOnChange}/>
                            </div>
                            <div className="text-center">
                                <button type="submit" name="submit" onClick={this.login} className="btn btn-primary btn-lg" required="required">
                                    Enviar
                                </button>
                            </div>
                        </form>
                        </div>
                    </div>
                    </div>
                </section>
                <div>
                <CadastroModel url={this.props.url}
                    show={this.state.modalOpen} onHide={this.handleClose}/>
                </div>
            </body>
        </html>
        );
    }
}

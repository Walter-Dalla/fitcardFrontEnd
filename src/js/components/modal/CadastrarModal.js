import React, { Component }  from 'react';

import  {
    Modal
}  from 'react-bootstrap'

import InputMask from 'react-input-mask';

export default class AddEstabelecimentoModal extends Component{

    constructor(props){
        super(props);
        this.state = {
            usuario:{
                senhaLogin:"",
                nomeLogin:""
            },
            categorias:[]
        }
        this.handleChange = this.handleChange.bind(this);
        this.cadastrarUsuario = this.cadastrarUsuario.bind(this);
        this.onHide = this.onHide.bind(this);
    }


    handleChange(event){
        let usuario = this.state.usuario;
        usuario[event.target.id] = event.target.value
        this.setState({
            usuario:usuario
        });
    }

    cadastrarUsuario(event){
        event.preventDefault();

        let url = this.props.url;
        let path = '/usuario/cadastrar';
        
        let body = {};
        let usuario = this.state.usuario;
        
        const payload = {
            method: 'POST',
            headers: new Headers({
                'Content-type':'application/json',
                'Token':localStorage.getItem('auth-token')
            }),
            body:JSON.stringify(usuario),
        };
        
        fetch(url + path, payload)
        .then(response =>{
            if(response.ok)
                return response.text;
            else
                throw new Error('Erro ocorreu');
        })
        .then(slaBixo =>
            {
                console.log(slaBixo);
            }

        ).catch(ex =>{
            console.log(ex);
        })

        this.props.onHide()
    
    }

    onHide(){
        this.setState({
            estabelecimento:{
                categoria:{}
            }
        })
        this.props.onHide();
    }

    render(){
        return (
            <Modal
            show={this.props.show}
            onHide={this.onHide}
            animation={false}
            centered>
                    <Modal.Header>
                        <Modal.Title>
                            <h2 className="text">
                                Cadastre-se
                            </h2>
                            </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row contact-wrap">
                            <div className="col-md-6 col-md-offset-3">
                            <div id="errormessage">
                            </div>
                                <form role="form" className="contactForm">
                                    <div>
                                        <div className="form-group">
                                            <label>Nome</label><br/>
                                            <input type="text" name="campos" className="form-control" 
                                                id="nomeLogin" placeholder="Walter Dalla" onChange={this.handleChange} 
                                                 required/>
                                        </div>
                                        <div className="form-group">
                                            <label>Senha</label><br/>
                                            <input type="text" name="campos" className="form-control" 
                                                id="senhaLogin" placeholder="********" onChange={this.handleChange} 
                                                 required/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <button variant="secondary" type="button" className="btn botao" onClick={this.props.onHide}>Fechar</button>
                        <button variant="primary" type="button" className="btn botao" onClick={this.cadastrarUsuario}>Savar</button>
                    </Modal.Footer>
            </Modal>
        );
    }
}
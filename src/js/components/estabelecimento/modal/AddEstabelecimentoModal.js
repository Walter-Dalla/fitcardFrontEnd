import React, { Component }  from 'react';
import {ativoInativoToBoolean} from '../../../utils';
import {handleCategoria} from '../../../utils/categoriaUtils'
import {renderCampos} from '../../../utils/renderCamposAlteraveisUtils'

import  {
    Modal
}  from 'react-bootstrap'

import InputMask from 'react-input-mask';

export default class AddEstabelecimentoModal extends Component{

    constructor(props){
        super(props);
        this.state = {
            estabelecimento:{
                categoria:{},
                status:"Ativo"
            },
            categorias:[]
        }
        this.handleChange = this.handleChange.bind(this);
        this.createEstabelecimento = this.createEstabelecimento.bind(this);
        this.onShow = this.onShow.bind(this);
        this.onHide = this.onHide.bind(this);
    }


    handleChange(event){
        let estabelecimento = this.state.estabelecimento;
        estabelecimento[event.target.id] =event.target.value
        this.setState({
            estabelecimento:estabelecimento
        });
    }

    onShow(){
        const estabelecimento = this.state.estabelecimento

        this.setState({
            estabelecimento:estabelecimento,
            campos:renderCampos(estabelecimento, this.handleChange, this.props.getCategoria)
        });
    }

    createEstabelecimento(event){
        event.preventDefault();

        console.log("salvando");

        let url = this.props.url;
        let path = '/estabelecimento';
        
        let body = {};
        let estabelecimento = this.state.estabelecimento;
        estabelecimento.status = ativoInativoToBoolean(estabelecimento.status)
        estabelecimento.categoria = handleCategoria(estabelecimento.categoria)
        
        const payload = {
            method: 'POST',
            headers: new Headers({
                'Content-type':'application/json',
                'Token':localStorage.getItem('auth-token')
            }),
            body:JSON.stringify(estabelecimento),
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
            open
            animation={false}
            onShow = {this.onShow}
            centered>
                    <Modal.Header>
                        <Modal.Title>
                            <h2 className="text">
                                Adicionar um estabelecimento
                            </h2>
                            </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row contact-wrap">
                            <div className="col-md-8 col-md-offset-2">
                            <div id="errormessage">
                            </div>
                                <form role="form" className="contactForm">
                                    {this.state.campos}
                                </form>
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <button variant="secondary" type="button" className="btn botao" onClick={this.props.onHide}>Fechar</button>
                        <button variant="primary" type="button" className="btn botao" onClick={this.createEstabelecimento}>Savar</button>
                    </Modal.Footer>
            </Modal>
        );
    }
}
import React, { Component }  from 'react';
import {renderCamposEstaticos} from '../../../utils/renderCamposEstaticos'
import  {
    Modal
}  from 'react-bootstrap'

import InputMask from 'react-input-mask';

export default class DeleteEstabelecimentoModal extends Component{

    constructor(props){
        super(props);
        this.state = {
            estabelecimento:{

            }
        }
        this.renderCampos = this.renderCampos.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.deleteEstabelecimento = this.deleteEstabelecimento.bind(this);
        this.onShow = this.onShow.bind(this);
    }

    onShow(){
        let estabelecimentoProps = this.props.modalInfo();
            
        this.setState({
            estabelecimento: this.props.modalInfo()
        })
        
        setTimeout(this.renderCampos, 100)
    }

    handleChange(event){
        let estabelecimento = this.state.estabelecimento
        estabelecimento[event.target.id] = event.target.value
        this.setState({
            estabelecimento:estabelecimento
        });
    }

    renderCampos(){
        
        this.setState({
            campos:renderCamposEstaticos(this.state.estabelecimento)
        });
    }

    deleteEstabelecimento(event){
        event.preventDefault();

        let url = this.props.url;
        let path = '/estabelecimento';
        
        let body = {};

        const payload = {
            method: 'DELETE',
            headers: new Headers({
                'Content-type':'application/json',
                'Token':localStorage.getItem('auth-token')
            })
        };

        const paramiter = '?cnpj='+this.state.estabelecimento.cnpj
        
        fetch(url + path + paramiter, payload)
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

    render(){
        return (
            <Modal
            show={this.props.show}
            onHide={()=>{
                this.setState({
                    campos:<></>
                })
                this.props.onHide()
            }}
            animation={false}
            onShow={this.onShow}
            centered>
                    <Modal.Header>
                        <Modal.Title>
                            <h2 className="text">
                                Deletar um estabelecimento
                            </h2>
                            </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row contact-wrap">
                            <div className="col-md-6 col-md-offset-3">
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
                        <button variant="primary" type="button" className="btn botao btnDeletar" onClick={this.deleteEstabelecimento}>Deletar</button>
                    </Modal.Footer>
            </Modal>
        );
    }
}
import React, { Component }  from 'react';
import {ativoInativoToBoolean, BtnAtivarOuDesativar} from '../../../utils';
import {handleCategoria} from '../../../utils/categoriaUtils';


import  {
    Modal
}  from 'react-bootstrap'

import InputMask from 'react-input-mask';

export default class UpdateStatusEstabelecimentoModal extends Component{

    constructor(props){
        super(props);
        this.state = {
            estabelecimento:{

            },
            nomeBotaoAtivarDesativar:"Ativar"
        }
        this.renderCampos = this.renderCampos.bind(this);
        this.updateEstabelecimento = this.updateEstabelecimento.bind(this);
        this.onShow = this.onShow.bind(this);
    }

    onShow(){
        let estabelecimento = this.props.modalInfo()
        this.setState({
            estabelecimento: estabelecimento,
            nomeBotaoAtivarDesativar: BtnAtivarOuDesativar(estabelecimento.status)
        })
        setTimeout(this.renderCampos, 100)
    }

    renderCampos(){
        let campos=
        <div>
            <div>
                <div className="form-group">
                    <label>Razão Social</label><br/>
                    <span>{this.state.estabelecimento.razaoSocial}</span>
                </div>
            </div>
            <div>
                <div className="form-group">
                    <label>Nome Fantasia</label>
                    <span>{this.state.estabelecimento.NomeFantasia}</span>
                </div>
            </div>
            <div>
                <div className="form-group">
                    <label>CNPJ</label>
                    <span>{this.state.estabelecimento.cnpj}</span>
                    
                </div>
            </div>
            <div>
                <div className="form-group">
                    <label>E-mail</label>
                    <span>{this.state.estabelecimento.email}</span>
                </div>
            </div>
            <div>
                <div className="form-group">
                    <label>Endereço</label>
                    <span>{this.state.estabelecimento.endereco}</span>
                </div>
            </div>
            <div>
                <div className="form-group">
                    <label>Cidade</label>
                    <span>{this.state.estabelecimento.cidade}</span>
                </div>
            </div>
            <div>
                <div className="form-group">
                    <label>Estado</label>
                    <span>{this.state.estabelecimento.estado}</span>
                </div>
            </div>
            <div>
                <div className="form-group">
                    <label>Telefone</label>
                    <span>{this.state.estabelecimento.telefone}</span>
                </div>
            </div>
            <div>
                <div className="form-group">
                    <label>Categoria</label>
                    <span>{this.state.estabelecimento.categoria}</span>
                </div>
            </div>
            <div>
                <div className="form-group">
                    <label>Status</label>
                    <span>{this.state.estabelecimento.status}</span>
                </div>
            </div>
            <div>
                <div className="form-group">
                    <label>Agência</label>
                    <span>{this.state.estabelecimento['Agência e Conta']}</span>
                </div>
            </div>
            <div>
                <div className="form-group">
                    <label>Agência</label>
                    <span>{this.state.estabelecimento['Agência e Conta']}</span>
                </div>
            </div>
        </div>


        this.setState({
            campos:campos
        });
    }

    updateEstabelecimento(event){
        event.preventDefault();

        let url = this.props.url;
        let path = '/estabelecimento';
        
        let body = {};
        let estabelecimento = this.state.estabelecimento;
        estabelecimento.status =  ativoInativoToBoolean(estabelecimento.status)
        estabelecimento.categoria = handleCategoria(estabelecimento.categoria)
        estabelecimento.status = !estabelecimento.status

        const payload = {
            method: 'PATCH',
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
                                {this.state.nomeBotaoAtivarDesativar} um estabelecimento
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
                        <button variant="secondary" type="button" className="btn botao" onClick={this.props.onHide}>
                            Fechar
                        </button>
                        <button variant="primary" type="button" className="btn botao" onClick={this.updateEstabelecimento}>
                            {this.state.nomeBotaoAtivarDesativar}
                        </button>
                    </Modal.Footer>
            </Modal>
        );
    }
}
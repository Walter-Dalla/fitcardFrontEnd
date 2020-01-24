import React, { Component }  from 'react';
import {ativoInativoToBoolean} from '../../../utils';
import {handleCategoria} from '../../../utils/categoriaUtils'
import {renderCampos} from '../../../utils/renderCamposAlteraveisUtils'
import  {
    Modal
}  from 'react-bootstrap'


export default class UpdateEstabelecimentoModal extends Component{

    constructor(props){
        super(props);
        this.state = {
            estabelecimento:{

            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.updateEstabelecimento = this.updateEstabelecimento.bind(this);
        this.onShow = this.onShow.bind(this);
    }


    onShow(){
        const estabelecimento = this.props.modalInfo();

        this.setState({
            estabelecimento:estabelecimento,
            campos:renderCampos(estabelecimento, this.handleChange, this.props.getCategoria)
        });
    }

    handleChange(event){
        const estabelecimento = this.state.estabelecimento
        const value = event.target.value;
        console.log(estabelecimento)
        this.setState({
            estabelecimento:{
                ...estabelecimento,
                [event.target.id]:value
            }
        });
    }


    updateEstabelecimento(event){
        event.preventDefault();

        let url = this.props.url;
        let path = '/estabelecimento';
        
        let body = {};
        let estabelecimento = this.state.estabelecimento;
        
        estabelecimento.status = ativoInativoToBoolean(estabelecimento.status)
        estabelecimento.categoria = handleCategoria(estabelecimento.categoria)
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
                                Editar um estabelecimento
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
                        <button variant="primary" type="button" className="btn botao" onClick={this.updateEstabelecimento}>Savar</button>
                    </Modal.Footer>
            </Modal>
        );
    }
}
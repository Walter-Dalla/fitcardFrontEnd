import React, { Component, useState }  from 'react';

import {booleanToAtivoInativo, BtnAtivarOuDesativar, inverterBotao} from '../../utils'
import {fetchForFitcardProjectBackend, getFiltro} from '../../utils/fetchUtils'
import { getCategoriaBackend } from '../../utils/categoriaUtils'

import Head from "../../paginas/head.js";
import Nav from "../../paginas/nav.js";

import { renderTabelaEstabelecimento } from './utils/TabelaUtils'

import ReactTable from 'react-table';
import "react-table/react-table.css";

import '../../../css/estabelecimento/estabelecimento.css'

import UpdateEstabelecimentoModal from './modal/UpdateEstabelecimentoModal'
import AddEstabelecimentoModal from './modal/AddEstabelecimentoModal';
import DeleteEstabelecimentoModal from './modal/DeleteEstabelecimentoModal'
import UpdateStatusEstabelecimentoModal from './modal/UpdateStatusEstabelecimentoModal'


export default class Estabelecimento extends Component{

    constructor(props){
        super(props);
        this.state = {
            estabelecimento:{
                razaoSocial : 'razão do meu libido',
                cnpj:"69.497.576/0001-02"
            },
            modalAddEstabelecimentoShow:false,
            modalInfo:{
                cnpj:0
            },
            botaoAtivarDesativar:{
                nomeBotaoAtivarDesativar:'Ativar',
                desabilitado:true
            }
        }
        this.getEstabelecimentosBackend = this.getEstabelecimentosBackend.bind(this);
        this.renderTabelaEstabelecimento = this.renderTabelaEstabelecimento.bind(this);
        this.openCreateModal = this.openCreateModal.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.getModalInfo = this.getModalInfo.bind(this);
        this.botaoAtivarDesativar = this.botaoAtivarDesativar.bind(this);
        this.atualizarTabela = this.atualizarTabela.bind(this);
        this.getCategoriasFromBackend = this.getCategoriasFromBackend.bind(this);
        this.getCategoria = this.getCategoria.bind(this);
        this.setEstabelecimentoSelecionado = this.setEstabelecimentoSelecionado.bind(this)
        this.filderOnChange = this.filderOnChange.bind(this);
        this.setBotaoDeStatus = this.setBotaoDeStatus.bind(this);
        this.setHabilitarDesabilitarBotaoDeStatus = this.setHabilitarDesabilitarBotaoDeStatus.bind(this);
        this.setCategorias = this.setCategorias.bind(this);
    }

    render(){
        return (
            <html lang="en">
            <Head page="Estabelecimento"/>
            <body>
                <Nav tela="estabelecimento"/>
                <section className="estabelecimento">
                    <div className="container">
                        <div className="text-center">
                            <h2>Estabelecimentos cadastrados</h2>
                            
                        </div>
                        <div className="row contact-wrap">
                            <div className="col-12">
                                <div className="tabela">
                                    {
                                        this.state.table
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-3 col-md-3">
                                <button type="button" className="btn botao" onClick={this.openCreateModal.bind(this, "create")}>
                                    Criar
                                </button>
                            </div>
                            <div className="col-sm-3 col-md-3">
                                <button type="button" className="btn botao" onClick={this.openCreateModal.bind(this, "update")}
                                disabled={this.state.botaoAtivarDesativar.desabilitado}>
                                    Alterar
                                </button>
                            </div>
                            <div className="col-sm-3 col-md-3">
                                <button type="button" className="btn botao" onClick={this.openCreateModal.bind(this, "status")} 
                                disabled={this.state.botaoAtivarDesativar.desabilitado}>
                                    {this.state.botaoAtivarDesativar.nomeBotaoAtivarDesativar}
                                </button>
                            </div>
                            <div className="col-sm-3 col-md-3">
                                <button type="button" className="btn botao" onClick={this.openCreateModal.bind(this, "delete")}
                                disabled={this.state.botaoAtivarDesativar.desabilitado}>
                                    Deletar
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="modais">
                <AddEstabelecimentoModal url={this.props.url}
                    show={this.state.modalAddEstabelecimentoShow} onHide={this.handleClose}
                    getCategoria={this.getCategoria}/>
                <UpdateEstabelecimentoModal url={this.props.url} modalInfo={this.getModalInfo}
                    show={this.state.modalUpdateEstabelecimentoShow} onHide={this.handleClose}
                    getCategoria={this.getCategoria}/>
                <DeleteEstabelecimentoModal url={this.props.url} modalInfo={this.getModalInfo}
                    show={this.state.deleteEstabelecimentoModal} onHide={this.handleClose}/>
                <UpdateStatusEstabelecimentoModal url={this.props.url} modalInfo={this.getModalInfo}
                    show={this.state.statusEstabelecimentoModal} onHide={this.handleClose}/>
                </div>
            </body>
        </html>
        );
    }

    botaoAtivarDesativar(negar){
        let nomeBotaoAtivarDesativar = ''

        if(this.state.modalInfo !== undefined){
            let status = this.state.modalInfo.status
            nomeBotaoAtivarDesativar = BtnAtivarOuDesativar(status, negar);
        }

        this.setState({
            botaoAtivarDesativar:{
                nomeBotaoAtivarDesativar,
                desabilitado:false
            }
        }) 
    }

    openCreateModal(modalType){
        
        switch(modalType){
            case 'create':
                this.setState({
                    modalAddEstabelecimentoShow:true
                }); 
                break;

            case 'update':
                this.setState({
                    modalUpdateEstabelecimentoShow:true
                }); 
                break;
                
            case 'delete':
                this.setState({
                    deleteEstabelecimentoModal:true
                }); 
                break;
                
            case 'status':
                this.setState({
                    statusEstabelecimentoModal:true
                }); 
                break;
                
        }
    }

    async componentDidMount(){
        this.atualizarTabela();
        this.setCategorias(await getCategoriaBackend(this.props.url))
    }

    async atualizarTabela(){
        let data = await this.getEstabelecimentosBackend()
        this.setHabilitarDesabilitarBotaoDeStatus(true);
        this.setEstabelecimentoSelecionado({})
        this.setArrayEstabelecimentos(data)
        
        this.renderTabelaEstabelecimento(data)
    }

    async renderTabelaEstabelecimento(data){
        
        if(data === undefined)
            data = this.state.estabelecimentos;
        
        this.setState({
            table:
            await renderTabelaEstabelecimento(
                data, this.renderTabelaEstabelecimento, this.botaoAtivarDesativar, this.atualizarTabela,
                this.filderOnChange, this.getModalInfo(), this.setEstabelecimentoSelecionado)
        });
    }

    //Handle change

    filderOnChange(event){
        const filtro = this.state.filter;
        this.setState({
            filter:{
                ...filtro,
                [event.target.id]:event.target.value
            }
        })
    }

    async handleClose(){
        await this.setState({
            modalAddEstabelecimentoShow:false,
            modalUpdateEstabelecimentoShow:false,
            deleteEstabelecimentoModal:false,
            statusEstabelecimentoModal:false,
        });
        setTimeout(()=>{
            this.atualizarTabela()
        },1000)
    }

    //Getter e Setters do state
    getModalInfo(){
        let estabelecimentoProps = Object.assign({},this.state.modalInfo);
        if(estabelecimentoProps.categoria !== undefined && estabelecimentoProps.categoria !== null)
            estabelecimentoProps.categoria = estabelecimentoProps.categoria.categoria;
        return estabelecimentoProps;
    }
    
    setArrayEstabelecimentos(estabelecimentos){
        this.setState({
            estabelecimentos,
        })
    }
    
    setEstabelecimentoSelecionado(estabelecimento){
        this.setState({
            modalInfo:estabelecimento
        })
    }
    
    async getEstabelecimentosBackend(){
        
        const url = this.props.url + '/estabelecimento' + getFiltro(this.state.filter);
        
        const payload = {
            method: 'GET'
        };
        
        let response = await fetchForFitcardProjectBackend(url, payload)
    
        return response.json;
    }

    getCategoria(){
        return this.state.categorias
    }

    setCategorias(categorias){
        this.setState({
            categorias,
        })
    }

    setHabilitarDesabilitarBotaoDeStatus(desabilitado){
        const btn = this.state.botaoAtivarDesativar;
        this.setState({
            botaoAtivarDesativar:{
                ...btn,
                desabilitado
            }
        })
    }

    setBotaoDeStatus(nomeBotaoAtivarDesativar){
        const btn = this.state.botaoAtivarDesativar;
        this.setState({
            botaoAtivarDesativar:{
                ...btn,
                nomeBotaoAtivarDesativar
            }
        })
    }

    async getCategoriasFromBackend(){
        
        let url = this.props.url + '/categoria';
        
        let payload = {
            method: 'GET'
        };
        
        let response = await fetchForFitcardProjectBackend(url, payload)

        if(response.code === 200){
            this.setCategorias(response.json)
        }

    }
}

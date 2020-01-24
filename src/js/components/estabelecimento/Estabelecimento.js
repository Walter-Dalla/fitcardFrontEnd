import React, { Component }  from 'react';

import {booleanToAtivoInativo, BtnAtivarOuDesativar, inverterBotao} from '../../utils'

import Head from "../../paginas/head.js";
import Nav from "../../paginas/nav.js";

import ReactTable from 'react-table';
import "react-table/react-table.css";

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
        this.onMount = this.onMount.bind(this);
        this.renderTabelaEstabelecimento = this.renderTabelaEstabelecimento.bind(this);
        this.openCreateModal = this.openCreateModal.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.getModalInfo = this.getModalInfo.bind(this);
        this.botaoAtivarDesativar = this.botaoAtivarDesativar.bind(this);
        this.atualizarTabela = this.atualizarTabela.bind(this);
        this.categorias = this.categorias.bind(this);
        this.getCategoria = this.getCategoria.bind(this);
        this.filderOnChange = this.filderOnChange.bind(this);
    }

    async categorias(){
        let url = this.props.url + '/categoria';
        
        const payload = {
            method: 'GET',
            headers: new Headers({
                'Content-type':'application/json',
                'Token':localStorage.getItem('auth-token')
            }),
        };
        
        let response = await fetch(url, payload)
        try {
            if(response.ok)
            this.setState({
                categorias: await response.json()
            })
            else
                throw new Error('Erro ocorreu');
        } catch (err) {
            console.log(err);
        }
    }

    getCategoria(){
        return this.state.categorias
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

    getModalInfo(){
        let estabelecimentoProps = Object.assign({},this.state.modalInfo);
        if(estabelecimentoProps.categoria !== undefined && estabelecimentoProps.categoria !== null)
            estabelecimentoProps.categoria = estabelecimentoProps.categoria.categoria;
        return estabelecimentoProps;
    }

    async onMount(){
        const filtros = this.state.filter;
        const url = this.props.url + '/estabelecimento';
        let querry = '?erro=null'
        
        const payload = {
            method: 'GET',
            headers: new Headers({
                'Content-type':'application/json',
                'Token':localStorage.getItem('auth-token')
            }),
        };
        
        if(filtros !== null && filtros !== undefined){
            const filtrosKey = Object.keys(filtros);
            filtrosKey.forEach(filtroKey =>{
                let value = filtros[filtroKey];
                if(value != '')
                   querry += "&" + filtroKey + "=" + value
            })

        }

        const response = await fetch(url + querry, payload)
        let responseJson;
        try {
            if(response.ok){
                responseJson = await response.json();
            }
            else
                throw new Error('Erro ocorreu');
        } catch (err) {
            console.log(err);
        }
        return responseJson;
    }

    handleClose(){
        this.setState({
            modalAddEstabelecimentoShow:false,
            modalUpdateEstabelecimentoShow:false,
            deleteEstabelecimentoModal:false,
            statusEstabelecimentoModal:false,
        });
        setTimeout(()=>{
            this.atualizarTabela()
            
            const modalInfo = this.state.modalInfo;

            let nomeBtn = this.state.botaoAtivarDesativar;
            nomeBtn.nomeBotaoAtivarDesativar = inverterBotao(nomeBtn.nomeBotaoAtivarDesativar)

            this.setState({
                botaoAtivarDesativar:{
                    ...nomeBtn,
                    nomeBotaoAtivarDesativar:nomeBtn.nomeBotaoAtivarDesativar,
                },
                modalInfo:{
                    ...modalInfo,
                    status:nomeBtn.nomeBotaoAtivarDesativar
                }
            })
        }, 1000)
    }

    openCreateModal(modalType){
        console.log(modalType)
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

    componentDidMount(){
        this.atualizarTabela();
        this.categorias();
    }

    async atualizarTabela(){
        this.setState({
            modalInfo:{

            },botaoAtivarDesativar:{
                desabilitado:true
            }
        }) 
        let sla = await this.onMount()
        this.renderTabelaEstabelecimento(sla)
    }

    filderOnChange(event){
        this.setState({
            filter:{
                [event.target.id]:event.target.value
            }
        })
    }

    async renderTabelaEstabelecimento(data){
        if(data === undefined)
            data = this.state.estabelecimentos
        let columns = [];
        let keys = [
            "cnpj",
            "razaoSocial",
            "nomeFantasia",
            "email",
            "endereco",
            "cidade",
            "estado",
            "cep",
            "telefone",
            "dataCadastro",
            "dataAlteracao",
            "categoria",
            "status",
            "conta",
            "agencia"
        ]
        if(data !== undefined && data !== null && data[0] !== undefined && data[0] !== null){
            let keys = Object.keys(data[0])
        }
            let bonusAccessor = '';
            let enumEstabelecimento = {
                cnpj:"CNPJ",
                razaoSocial:"Razão social",
                nomeFantasia:"Nome Fantasia",
                email:"Email",
                endereco:"Endereço",
                cidade:"Cidade",
                estado:"Estado",
                telefone:"Telefone",
                dataCadastro:"Data Cadastro",
                categoria:"Categoria",
                status:"Status",
                conta:"Conta",
                agencia:"Agencia"
            };
                
            for (let count = 0; count < keys.length ; count++) {
                let header = keys[count];
                
                bonusAccessor = keys[count] !== "categoria"? '':'.categoria';

                if(enumEstabelecimento[keys[count]] !== undefined)
                    header = enumEstabelecimento[keys[count]]
                
                    header = 
                    <>
                        {header}<br/>
                        <input className="filterInput" onClick={event => {
                            event.stopPropagation()
                        }}id={keys[count]} onBlur={this.atualizarTabela} onChange={this.filderOnChange}>

                        </input>
                    </>
                columns.push({
                    Header: header, 
                    accessor: keys[count] + bonusAccessor
                });
            }

            this.setState({
                estabelecimentos:data
            })
            
            data.forEach(estabelecimento => {
                estabelecimento.status = booleanToAtivoInativo(estabelecimento.status)
            });
            
        this.setState({
            table: <ReactTable
            defaultPageSize="5"
            defaultPageSize="10"
            data={data}
            columns={columns}
            className="-striped -highlight"
        getTrProps={(state, rowInfo) => {
            if (rowInfo !== undefined) {
                let cnpj = this.state.modalInfo.cnpj;
                let color = '';
                
                if(rowInfo.original !== undefined)
                    color = rowInfo.original.cnpj === cnpj ? '#9999ff' : ''
                    
                    return {
                        onClick: async (e) => {
                            let estabelecimento = rowInfo.original;
                            
                            await this.setState({
                                modalInfo:estabelecimento
                            }) 
                            this.renderTabelaEstabelecimento();
                            this.botaoAtivarDesativar();
                        },
                        style:{
                            background: color
                        }
                    }
                }else
                return {}
                }
            }
            />
        });
    }

    render(){
        return (
            <html lang="en">
            <Head page="Estabelecimento"/>
            <body>
                <Nav tela="estabelecimento"/>
                <section className="contact-page">
                    <div className="container">
                        <div className="text-center">
                            <h2>Estabelecimentos cadastrados</h2>
                            
                        </div>
                        <div className="row contact-wrap">
                            <div className="col-6">
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
}

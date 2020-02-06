import React, { Component }  from 'react';

import ReactTable from 'react-table';
import "react-table/react-table.css";

import {booleanToAtivoInativo, BtnAtivarOuDesativar, inverterBotao } from '../../../utils'

function handleTableColuns(data, atualizarTabela, filderOnChange){
    const enumEstabelecimento = {
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
                }}id={keys[count]} onBlur={atualizarTabela} onChange={filderOnChange}>

                </input>
            </>
        columns.push({
            Header: header, 
            accessor: keys[count] + bonusAccessor
        });
    }
    return columns;
}

export async function renderTabelaEstabelecimento(data, 
    renderTabelaEstabelecimento, botaoAtivarDesativar, atualizarTabela,
     filderOnChange, estabelecimentoSelecionado, setModalInfo){
    if(data === undefined)
        return <div></div>;

    let columns = handleTableColuns(data, atualizarTabela, filderOnChange);
        
    data.forEach(estabelecimento => {
        estabelecimento.status = booleanToAtivoInativo(estabelecimento.status)
    });
        
    return <ReactTable
        defaultPageSize="5"
        defaultPageSize="10"
        data={data}
        columns={columns}
        className="-striped -highlight"
        getTrProps={(state, rowInfo) => {
            if (rowInfo !== undefined) {
                let cnpj = estabelecimentoSelecionado.cnpj;
                let color = '';
                
                if(rowInfo.original !== undefined)
                    color = rowInfo.original.cnpj === cnpj ? '#9999ff' : ''
                
                return {
                    onClick: async (e) => {
                        let estabelecimento = rowInfo.original;
                        
                        setModalInfo(estabelecimento)
                        renderTabelaEstabelecimento();
                        botaoAtivarDesativar();
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
}
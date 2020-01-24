import React, { Component }  from 'react';


export function renderCamposEstaticos(estabelecimento){
    let campos=
    <div>
        <div>
            <div className="form-group">
                <label>Razão Social</label><br/>
                <span className="form-control" >{estabelecimento.razaoSocial}</span>
            </div>
        </div>
        <div>
            <div className="form-group">
                <label>Nome Fantasia</label><br/>
                 <span className="form-control" >{estabelecimento.NomeFantasia}</span>
            </div>
        </div>
        <div>
            <div className="form-group">
                <label>CNPJ</label><br/>
                 <span className="form-control" >{estabelecimento.cnpj}</span>
                
            </div>
        </div>
        <div>
            <div className="form-group">
                <label>E-mail</label><br/>
                 <span className="form-control" >{estabelecimento.email}</span>
            </div>
        </div>
        <div>
            <div className="form-group">
                <label>Endereço</label><br/>
                 <span className="form-control" >{estabelecimento.endereco}</span>
            </div>
        </div>
        <div>
            <div className="form-group">
                <label>Cidade</label><br/>
                 <span className="form-control" >{estabelecimento.cidade}</span>
            </div>
        </div>
        <div>
            <div className="form-group">
                <label>Estado</label><br/>
                 <span className="form-control" >{estabelecimento.estado}</span>
            </div>
        </div>
        <div>
            <div className="form-group">
                <label>Telefone</label><br/>
                 <span className="form-control" >{estabelecimento.telefone}</span>
            </div>
        </div>
        <div>
            <div className="form-group">
                <label>Categoria</label><br/>
                 <span className="form-control" >{estabelecimento.categoria}</span>
            </div>
        </div>
        <div>
            <div className="form-group">
                <label>Status</label><br/>
                 <span className="form-control" >{estabelecimento.status}</span>
            </div>
        </div>
        <div>
            <div className="form-group">
                <label>Agência</label><br/>
                 <span className="form-control" >{estabelecimento['Agência e Conta']}</span>
            </div>
        </div>
        <div>
            <div className="form-group">
                <label>Agência</label><br/>
                 <span className="form-control" >{estabelecimento['Agência e Conta']}</span>
            </div>
        </div>
    </div>


    return campos
}
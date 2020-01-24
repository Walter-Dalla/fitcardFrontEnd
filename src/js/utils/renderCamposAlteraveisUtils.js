import React, { Component }  from 'react';
import InputMask from 'react-input-mask';

export function renderCampos(estabelecimento, handleChange, getCategoria){
    const categoriasOption = getCategoriaOptions(estabelecimento, getCategoria)
    const statusOptional = getStatusOption(estabelecimento, handleChange)

    let campos=
        <div>
            <div>
                <div className="form-group">
                    <label>Razão Social</label><br/>
                    <input type="text" name="campos" className="form-control" 
                        id="razaoSocial" placeholder="Nome completo da empresa na justiça" data-rule="minlen:1"
                        data-msg="Por favor, escreva o nome da sua empresa" onChange={handleChange} 
                        defaultValue={estabelecimento.razaoSocial} required/>
                    <div className="validation">
                    </div>
                </div>
            </div>
            <div>
                <div className="form-group">
                    <label>Nome Fantasia</label><br/>
                    <input type="text" name="campos" className="form-control" 
                        id="nomeFantasia" placeholder="Nome coloquial na justiça" onChange={handleChange}
                        defaultValue={estabelecimento.NomeFantasia} />
                    <div className="validation">
                    </div>
                </div>
            </div>
            <div>
                <div className="form-group">
                    <label>CNPJ</label><br/>
                    <InputMask type="text" name="campos" className="form-control" 
                        id="cnpj" placeholder="00.000.000/0000-00"
                        mask="99.999.999/9999-99" onChange={handleChange}
                        defaultValue={estabelecimento.cnpj}/>
                    <div className="validation">
                    </div>
                </div>
            </div>
            <div>
                <div className="form-group">
                    <label>E-mail</label><br/>
                    <input type="text" name="campos" className="form-control" 
                        id="email" placeholder="email@email.com"  onChange={handleChange}
                        defaultValue={estabelecimento.email}/>
                    <div className="validation">
                    </div>
                </div>
            </div>
            <div>
                <div className="form-group">
                    <label>CEP</label><br/>
                    <InputMask type="text" name="cep" className="form-control" 
                        id="cep" placeholder="	13152-428" onChange={handleChange}
                        defaultValue={estabelecimento.cep} mask="99999-999"/>
                </div>
            </div>
            <div>
                <div className="form-group">
                    <label>Endereço</label><br/>
                    <input type="text" name="campos" className="form-control" 
                        id="endereco" placeholder="Rua adolfo germano rogge" onChange={handleChange}
                        defaultValue={estabelecimento.endereco}/>
                </div>
            </div>
            <div>
                <div className="form-group">
                    <label>Cidade</label><br/>
                    <input type="text" name="campos" className="form-control" 
                        id="cidade" placeholder="São Paulo" onChange={handleChange}
                        defaultValue={estabelecimento.cidade}/>
                    <div className="validation">
                    </div>
                </div>
            </div>
            <div>
                <div className="form-group">
                    <label>Estado</label><br/>
                    <input type="text" name="campos" className="form-control" 
                        id="estado" placeholder="SP"  onChange={handleChange}
                        defaultValue={estabelecimento.estado}/>
                    <div className="validation">
                    </div>
                </div>
            </div>
            <div>
                <div className="form-group">
                    <label>Telefone</label><br/>
                    <InputMask type="text" name="campos" className="form-control" 
                        id="telefone" placeholder="(19)994691881"
                        mask="(99)99999-9999" onChange={handleChange}
                        defaultValue={estabelecimento.telefone}/>
                </div>
            </div>
            <div>
                <div className="form-group">
                    <label>Categoria</label><br/>
                    <select id="categoria" className="form-control" name="campos" onChange={handleChange}> 
                        {categoriasOption}
                    </select>
                </div>
            </div>
            <div>
                <div className="form-group">
                    <label>Status</label><br/>
                        {statusOptional}
                </div>
            </div>
            <div>
                <div className="form-group">
                    <label>Agencia</label><br/>
                    <InputMask type="text" name="campos" className="form-control" 
                        id="agencia" placeholder="000-0"
                        mask="999-9" onChange={handleChange}
                        defaultValue={estabelecimento.agencia}/>
                </div>
            </div>
            <div>
                <div className="form-group">
                    <label>Conta</label><br/>
                    <InputMask type="text" name="campos" className="form-control" 
                        id="conta" placeholder="00.000-0"
                        mask="99.999-9" onChange={handleChange}
                        defaultValue={estabelecimento.conta}/>
                </div>
            </div>
        </div>

    return campos;
}

export function getCategoriaOptions(estabelecimento, getCategoria){
    const categorias = getCategoria()
    let categoriasOption = [
        <option key="0" value="null"></option>
    ];

    categorias.forEach(categoria => {
        let categoriaNome = categoria.categoria;
        
        let selected = categoriaNome == estabelecimento.categoria;
        categoriasOption.push(
            <option key={categoria.id} selected={selected} value={categoriaNome}>
                {categoriaNome}
            </option>
        )
    });
    return categoriasOption
}


export function getStatusOption(estabelecimento,handleChange){
    const statusSelected = [estabelecimento.status == 'Ativo', estabelecimento.status == 'Inativo']

    const statusOption = 
    <select id="status" className="form-control" name="campos" onChange={handleChange}>
        <option selected={statusSelected[0]}>
            Ativo
        </option>
        <option selected={statusSelected[1]}>
            Inativo
        </option>
    </select> 
    return statusOption
}
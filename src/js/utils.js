export function ativoInativoToBoolean(status){
    if(typeof status === 'boolean')
        return status
    else
        return status === 'Ativo'? true:false 
}

export function booleanToAtivoInativo(status){
    if(typeof status === 'boolean')
        return status? 'Ativo':'Inativo' 
    else
        return status
}

export function BtnAtivarOuDesativar(status){
    if(typeof status === 'boolean')
        return status? 'Inativar':'Ativar' 
    else
    return status === 'Ativo'? 'Inativar':'Ativar' 
}

export function inverterBotao(status){
    return status === 'Ativar'? 'Inativar':'Ativar' 
}
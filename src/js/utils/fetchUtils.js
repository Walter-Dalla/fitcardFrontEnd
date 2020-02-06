/**
 * Esse metodo consiste em transformar o handler do fetch mais simples
 * Ele só pode ser utilizado para o fetch do projeto FitCard
 * 
 * @param {*} url 
 * @param {*} payload 
 */
export async function fetchForFitcardProjectBackend(url, payload){
        
        payload["headers"] = new Headers({
            'Content-type':'application/json',
            'Token':localStorage.getItem('auth-token')
        });

        let response = await fetch(url, payload)
        return {
            json: await response.json(),
            code: response.status
        }
}
/**
 * Esse metodo consiste em criar a string de param do metodo get
 * Ex: http://suaUrl?idUsuario=123
 * 
 * @param {*} filtros 
 */
export function getFiltro(filtros){
    var querry = "?";

    if(filtros !== null && filtros !== undefined){
        const filtrosKey = Object.keys(filtros);
        let value;
        let key;
        for (let index = 0; index < filtrosKey.length; index++) {
            key = filtrosKey[index];

            value = filtros[key];
            if( key == 1)
                querry += key + "=" + value
            else
                if(value != '')
                    querry += "&" + key + "=" + value
            
        }
    }
    return querry;
}
import { fetchForFitcardProjectBackend } from './fetchUtils'

export async function getCategoriaBackend(urlBackend){
        if(urlBackend === null)
            return null;

        const url = urlBackend + '/categoria';
        
        const payload = {
            method: 'GET'
        };
        
        const response = await fetchForFitcardProjectBackend(url, payload)

        if(response.code === 200){
            return response.json;
        }

}

export function handleCategoria(categoriaName){
    return categoriaName !== null && categoriaName !== undefined && Object.keys(categoriaName).length !== 0? {
        categoria:categoriaName
    }:null
}
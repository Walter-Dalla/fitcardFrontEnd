export function handleCategoria(categoriaName){
    return categoriaName !== null && categoriaName !== undefined && Object.keys(categoriaName).length !== 0? {
        categoria:categoriaName
    }:null
}
import React, { Component }  from 'react';

import Head from "./head.js";
import Footer from "./footer.js";
import Nav from "./nav.js";
import "../../img/7.jpg";

export default class Services extends Component{

    render(){
        return (
            <html lang="en">

            <Head/>

            <body>
            <Nav tela='services'/>

            <div class="services">
                <div class="container">
                <section class="action">
                    <div class="container">
                    <div class="left-text hidden-xs">
                        <h4>Gereciamento de estabelecimentos</h4>
                        <p><em>
                            O nosso gerenciamento de estabelecimentos é o unico no 
                            mercado com as seguintes opçoes:
                            <ul>
                                <li>Criar/Salvar</li>
                                <li>Ler</li>
                                <li>Editar</li>
                                <li>Deletar</li>
                            </ul>
                            </em><br/>
                        <br/>É um produto com 7.1 no TecnoCritics</p>
                    </div>
                    <div class="right-image hidden-xs">
                        <image > </image>
                    </div>
                    </div>
                </section>
                </div>
            </div>
            <Footer/>

            </body>

            </html>
        );      
    }
}
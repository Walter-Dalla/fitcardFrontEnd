import React, { Component }  from 'react';
import ReactDOM from 'react-dom';

import Head from "./head.js";
import Footer from "./footer.js";
import Nav from "./nav.js";

import '../../css/home/home.css'
import "../../img/7.jpg";

export default class home extends Component{

    render(){
        return (
            <html lang="en">
                <Head page="Home"/>
                <body>
                <Nav tela='home'/>
                <div class="sobre">
                    <div class="container">
                    <div class="text-center">
                        <h2>Project: FitCard Github </h2>
                        <div class="col-md-10 col-md-offset-1">
                            <p>O nosso objetivo é transformar a forma com que você interage com seus estabelecimentos</p>
                        </div>

                    </div>
                    </div>
                </div>

                <hr/>

                <div class="services">
                    <div class="container">
                        <div class="text-center">
                            <h2>Nossos valores</h2>
                            <div class="col-md-3 ">
                                <i class="fa fa-heart-o"></i>
                                <h3>Responsabilidade social</h3>
                                <p>
                                    O ser humano é um ser social, <br/>
                                    por isso sempre que possivel devemos nos relacionar com outras pessoas
                                </p>
                            </div>
                            <div class="col-md-3 ">
                                <i class="fa fa-cloud"></i>
                                <h3>Conteudo e serviços na nuvem</h3>
                                <p>Todo o seu conteudo é salvo na nuvem e
                                        está protegido por backups da nossa base de dados</p>
                                <p>Além disso os nossos serviços estão
                                     preparados com toda a infreestrutura necessaria para lhe atender</p>
                            </div>
                            <div class="col-md-3 ">
                                <i class="fa fa-book"></i>
                                <h3>Novas tecnologias</h3>
                                <p>Estamos sempre dispostos a utilizar novas tecnologias 
                                    para melhorar atender os nossos clientes</p>
                            </div>
                            <div class="col-md-3">
                                <i class="fa fa-gear"></i>
                                <h3>Equipe de suporte técnico</h3>
                                <p>A nossa <a href="/equipe"> equipe </a> de suporte está pronta e capacitada para 
                                    resolver qualquer imprevisto no sistema</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </body>
        </html>
        );
        
    }
}
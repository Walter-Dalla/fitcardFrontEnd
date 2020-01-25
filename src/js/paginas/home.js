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
                <div className="home">
                    
                    <div className="sobre">
                        <div className="container">
                        <div className="text-center">
                            <h2>Project: FitCard Github </h2>
                            <div className="col-md-10 col-md-offset-1">
                                <p>O nosso objetivo é transformar a forma com que você interage com seus estabelecimentos</p>
                            </div>

                        </div>
                        </div>
                    </div>

                    <hr/>

                    <div className="services">
                        <div className="container">
                            <div className="text-center">
                                <h2>Nossos valores</h2>
                                <div className="col-md-3 ">
                                    <i className="fa fa-heart-o"></i>
                                    <h3>Responsabilidade social</h3>
                                    <p>
                                        O ser humano é um ser social, <br/>
                                        por isso sempre que possivel devemos nos relacionar com outras pessoas
                                    </p>
                                </div>
                                <div className="col-md-3 ">
                                    <i className="fa fa-cloud"></i>
                                    <h3>Conteudo e serviços na nuvem</h3>
                                    <p>Todo o seu conteudo é salvo na nuvem e
                                            está protegido por backups da nossa base de dados</p>
                                    <p>Além disso os nossos serviços estão
                                        preparados com toda a infreestrutura necessaria para lhe atender</p>
                                </div>
                                <div className="col-md-3 ">
                                    <i className="fa fa-book"></i>
                                    <h3>Novas tecnologias</h3>
                                    <p>Estamos sempre dispostos a utilizar novas tecnologias 
                                        para melhorar atender os nossos clientes</p>
                                </div>
                                <div className="col-md-3">
                                    <i className="fa fa-gear"></i>
                                    <h3>Equipe de suporte técnico</h3>
                                    <p>A nossa <a href="/equipe"> equipe </a> de suporte está pronta e capacitada para 
                                        resolver qualquer imprevisto no sistema</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </body>
        </html>
        );
        
    }
}
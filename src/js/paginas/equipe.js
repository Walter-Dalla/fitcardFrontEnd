import React, { Component }  from 'react';

import Head from "./head.js";
import Footer from "./footer.js";
import Nav from "./nav.js";

import '../../css/equipe/equipe.css'

import img7 from "../../img/7.jpg";
import img1 from "../../img/1.jpg";
import img2 from "../../img/2.jpg";
import img3 from "../../img/3.jpg";

export default class Equipe extends Component{

    render(){
        return (
            <html lang="en">

            <Head/>

            <body>
            <Nav tela='equipe'/>

            <div className="equipe">
                <div className="container">
                    <h1>A equipe que proporcionou esse projeto "incrivel"</h1>
                    <div className="row">
                        <div className="col-3 apresentacao">
                            <p><em>
                                Walter Dalla Torre Neto
                            </em></p>
                        </div>
                        <div className="col-3 apresentacao">
                            <p><em>
                                Walter D. T. N.
                            </em></p>
                        </div>
                        <div className="col-3 apresentacao">
                            <p><em>
                            Neto, Walter
                            </em></p>
                        </div>
                        <div className="col-3 apresentacao">
                            <p><em>
                                Waltinho
                            </em></p>
                        </div>
                    </div>
                    <div className="row">
                        <div className=" col-3 imagens">
                            <img src={img7}>
                            </img>
                        </div>
                        <div className=" col-3 imagens">
                            <img src={img1}>
                            </img>
                        </div>
                        <div className=" col-3 imagens">
                            <img src={img3}>
                            </img>
                        </div>
                        <div className=" col-3 imagens">
                            <img src={img2}>
                            </img>
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
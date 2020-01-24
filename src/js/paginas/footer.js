import React, { Component }  from 'react';
import ReactDOM from 'react-dom';

import '../../css/footer/footer.css'
export default class Footer extends Component{

    render(){
        return (
            <div>
                <footer>
                    <div class="container">
                    <div class="col-md-4 wow fadeInDown">
                        <h4>Aonde ficamos</h4>
                        <p></p>
                        <div class="contact-info">
                        <ul>
                            <li><i class="fa fa-home fa"></i>Rua: Adolfo germano rogge, 300, Cosmópolis - SP</li>
                            <li><i class="fa fa-phone fa"></i> 19 994691881</li>
                            <li><i class="fa fa-envelope fa"></i> wwddttnn@hotmail.com</li>
                        </ul>
                        </div>
                    </div>

                    </div>
                </footer>

                <script src="js/jquery.min.js"></script>
                <script src="js/jquery-migrate.min.js"></script>
                <script src="js/bootstrap.min.js"></script>
            </div>
        );

        
    }


}
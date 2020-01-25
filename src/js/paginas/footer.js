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
                        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
                        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
                        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
                    </div>
                </footer>
            </div>
        );

        
    }


}
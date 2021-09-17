import React, {Component} from 'react';
import './Detail.css';


class Detail extends Component {

    constructor(props) {
        super(props);
    }


    render(){
        return (
            <div className="card">
                <div className="b_back" onClick={this.props.goBack}>Volver</div>
                <div className="col2">
                    <img src={this.props.data.url} />
                </div>
                <div className="col1">
                    <h1>{this.props.data.title}</h1>
                    <p>{this.props.data.explanation}</p>
                </div>
            </div>
        );
    }

}

export default Detail;


import React, {Component} from "react";
import {Header} from "../Header/Header";
import * as swal from 'sweetalert';
import * as axios from 'axios';
import PronosticsDetails from "./PronosticsDetails/PronosticsDetails";
import BabyFootImage from "../BabyFootImage/BabyFootImage";

export class Pronostics extends Component {

    constructor(props) {
        super(props);
        this.state = { pronostics: [] }
    }

    async componentDidMount() {
        const response = await axios.get('/api/pronostic');
        if (response.status === 200) {
            const data = response.data;
            await this.setState({pronostics: data});
        } else {
            swal('Oooops', 'Quelques choses ne va pas', 'error');
        }
    }

    render() {
        return(
            <>
                <Header/>
                <BabyFootImage />
                <div className={"px-2"}>
                    <h1>Les pronostiques</h1>
                    <div className={"ligne -5"}/>
                    {this.state.pronostics.map( element => (
                        <PronosticsDetails element={element} key={element._id} />
                    ))}
                </div>
            </>
        )
    }
}

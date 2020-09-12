import React, {Component} from "react";
import {Header} from "../Header/Header";
import * as swal from 'sweetalert';
import axios from 'axios';
import PronosticsDetails from "./PronosticsDetails/PronosticsDetails";
import BabyFootImage from "../BabyFootImage/BabyFootImage";
import "./Pronostics.css"

export class Pronostics extends Component {

    constructor(props) {
        super(props);
        this.state = { pronostics: [] }
    }

    async componentDidMount() {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/pronostic`);
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
                <div className={"container px-2 w-100 mb-5"}>
                    <h1>Les pronostics</h1>
                    <div className={"ligne -5"}/>
                    <div className={"row m-auto d-flex justify-content-around"}>
                        {this.state.pronostics.map( element => (
                            <PronosticsDetails element={element} key={element._id} />
                        ))}
                    </div>
                </div>
            </>
        )
    }
}

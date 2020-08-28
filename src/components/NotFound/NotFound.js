import React from "react";
import Eyes from "./eyes.svg";
import Pupilles from "./pupille.svg";
import './NotFound.css'
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className={"notFoundContainer"}>
            <div className={"eyesContainer"}>
                <div className="eyesSvg">
                    <img src={Eyes} alt="" className={"eyes"}/>
                    <img src={Pupilles} alt="" className={"pupilles"}/>
                </div>
            </div>
            <div className="notFoundText">
                <p>Bah alors,n 'est pas peur !!! Tu t'es juste un peu perdu.</p>
                <p>Clique sur ce bouton pour revenir au formulaire</p>
                <Link to="/" className="nav-link">
                    <button className={"btn btn-secondary"}>Formulaire</button>
                </Link>
            </div>
        </div>
    );
}

export default NotFound;

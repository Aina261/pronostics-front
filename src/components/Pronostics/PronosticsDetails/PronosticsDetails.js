import React from "react";
import moment from "moment";
import "./PronosticsDetails.css";
moment.locale('fr');

function PronosticsDetails(props) {
    return (
        <div className={"element mt-5 d-flex flex-column justify-content-center"}>
            <h2 className={"my-0"}>Voici le pronostic de <strong>{props.element.firstName}</strong></h2>
            <small>Proposé le {moment(props.element.created).format('DD-MM-YYYY à HH:mm')}</small>
            <div>
                <ul className={"mt-3"}>
                    <li>Son genre : {props.element.gender === "girl" ? "Fille" : "Garçon"}</li>
                    <li>Son prénom : {props.element.name}</li>
                    <li>Sa date de naissance : {moment(props.element.dateBirth).format('DD-MM-YYYY')}</li>
                    <li>Son heure de naissance : {props.element.hourBirth}</li>
                    <li>Heure du début du travail : {props.element.workStart}</li>
                    <li>Heure de fin du travail : {props.element.workEnd}</li>
                    <li>Durée de l'accouchement : {props.element.childbirthDuration} minutes</li>
                    <li>Sa taille : {props.element.height} cm</li>
                    <li>Son poids : {props.element.weight} grammes</li>
                    <li>Sa couleur de cheveux : {props.element.hairColor}</li>
                    <li>Sa couleur des yeux : {props.element.eyeColor}</li>
                    <li>Où sera Papa : {props.element.whereDad}</li>
                </ul>
                <h3>Point bonus</h3>
                <ul className={"mt-3"}>
                    <li>Il/Elle aura {props.element.likeMum.toLowerCase()}, comme maman</li>
                    <li>Il/Elle aura {props.element.likeDad.toLowerCase()}, comme papa</li>
                </ul>
            </div>
            <div className={"ligne"}/>
        </div>
    );
}

export default PronosticsDetails;

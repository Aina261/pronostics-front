import React, {Component} from "react";
import { Formik, Field } from 'formik';
import * as swal from 'sweetalert';
import axios from 'axios';
import * as Yup from 'yup';
import "./PronosticForm.css";
import {Header} from "../Header/Header";
import BabyFootImage from "../BabyFootImage/BabyFootImage";

export class PronosticForm extends Component {

    schema = Yup.object().shape({
        created: Yup.date().default(() => { return new Date() }),
        firstName: Yup.string().required(),
        lastName: Yup.string().required(),
        email: Yup.string().required().email(),
        name: Yup.string().required(),
        workStart: Yup.string().required(),
        workEnd: Yup.string().required(),
        whereDad: Yup.string().required(),
        hourBirth: Yup.string().required(),
        dateBirth: Yup.date().required(),
        childbirthDuration: Yup.string().required(),
        height: Yup.number().required().positive().integer(),
        weight: Yup.number().required().positive().integer(),
        hairColor: Yup.string().required(),
        eyeColor: Yup.string().required(),
        gender: Yup.mixed().required().oneOf(['girl', 'boy', 'alien', 'unicorn']),
        likeMum: Yup.string(),
        likeDad: Yup.string()
    });

    submit = (values, actions) => {
        console.log(values);
        try {
            axios
                .post(`${process.env.REACT_APP_BASE_URL}/api/pronostic`, {values})
                .then(response => {
                    console.log(response);
                    if (response.status === 201) {
                        swal('Oooh yeah', 'Ton pronostic à bien été enregistré. \n\n Celui qui gagne devra changer 100 fois sa couche 😁', 'success');
                    }
                })
                .then(error => {
                    if(error) {
                        console.log(error);
                        swal('Oooops', 'Quelques choses ne va pas', 'error');
                    }
                })
        } catch (error) {
            swal('Oooops', 'Quelques choses ne va pas', 'error');
        }
        actions.isSubmitting = false;
        actions.resetForm();
    }

    render() {
        return (
            <>
                <Header/>
                <BabyFootImage />
                <Formik
                    onSubmit={this.submit}
                    initialValues={{created: '', firstName: '', lastName: '', email: '', name: '', workStart: '', workEnd: '', whereDad: '', hourBirth: '', dateBirth: '2021-03-01', childbirthDuration: '', height: '', weight: '', hairColor: '', eyeColor: '', gender: '', likeMum: '', likeDad: ''}}
                    validationSchema={this.schema}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        }) => (
                        <form onSubmit={ handleSubmit } className="align-items-center w-100 w-md-75 w-lg-50 w-xl-25 mb-5">
                            <div className={"w-100 w-md-75 w-lg-50 w-xl-25 px-2 px-sm-5"}>
                                <h2>Pour te reconnaître</h2>
                                <div className="ligne"/>
                                <div className={"form-group"}>
                                    <div className="error">{errors.firstName && touched.firstName && errors.firstName}</div>
                                    <label htmlFor="firstName">Prénom : </label>
                                    <Field className={"form-control"} name="firstName" onChange={handleChange} onBlur={handleBlur} value={values.firstName} placeholder={"Prénom"} />
                                </div>

                                <div className={"form-group"}>
                                    <div className="error">{errors.lastName && touched.lastName && errors.lastName}</div>
                                    <label htmlFor="lastName">Nom : </label>
                                    <Field className={"form-control"} type="text" name="lastName" onChange={handleChange} onBlur={handleBlur} value={values.lastName} placeholder={"Nom"} />
                                </div>

                                <div className={"form-group"}>
                                    <div className="error">{errors.email && touched.email && errors.email}</div>
                                    <label htmlFor="email">Email : </label>
                                    <Field className={"form-control"} type="email" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} placeholder={"Email"} />
                                </div>
                            </div>

                            <div className={"w-100 w-md-75 w-lg-50 w-xl-25 px-2 px-sm-5"}>
                                <h2>Pour le petit</h2>
                                <div className="ligne"/>

                                <div className={"form-group"}>
                                    <div className="error">{errors.gender && touched.gender && errors.gender}</div>
                                    <label htmlFor="gender">Sexe : </label>
                                    <Field className={"form-control"} as="select" name="gender" onChange={handleChange} onBlur={handleBlur} value={values.gender} placeholder={"Sexe"}>
                                        <option defaultValue={"choose"}>Choisir</option>
                                        <option value="girl">Fille</option>
                                        <option value="boy">Garçon</option>
                                        <option value="alien">Alien</option>
                                        <option value="unicorn">Licorne</option>
                                    </Field>
                                </div>

                                <div className={"form-group"}>
                                    <div className="error">{errors.name && touched.name && errors.name}</div>
                                    <label htmlFor="name">Prénom : </label>
                                    <Field className={"form-control"} type="text" name="name" onChange={handleChange} onBlur={handleBlur} value={values.name} placeholder={"Prénom"}/>
                                </div>

                                <div className={"form-group"}>
                                    <div className="error">{errors.dateBirth && touched.dateBirth && errors.dateBirth}</div>
                                    <label htmlFor="dateBirth">Date de naissance : </label>
                                    <Field className={"form-control"} type="date" name="dateBirth" onChange={handleChange} onBlur={handleBlur} value={values.dateBirth} placeholder={"Date de naissance"}/>
                                </div>

                                <div className={"form-group"}>
                                    <div className="error">{errors.hourBirth && touched.hourBirth && errors.hourBirth}</div>
                                    <label htmlFor="hourBirth">Heure de naissance : </label><small className={"text-warning"}> (ex : 20h30)</small>
                                    <Field className={"form-control"} type="text" name="hourBirth" onChange={handleChange} onBlur={handleBlur} value={values.hourBirth} placeholder={"Heure de naissance"}/>
                                </div>

                                <div className={"form-group"}>
                                    <div className="error">{errors.workStart && touched.workStart && errors.workStart}</div>
                                    <label htmlFor="workStart">Heure du début du travail : </label><small className={"text-warning"}> (ex : 20h30)</small>
                                    <Field className={"form-control"} type="text" name="workStart" onChange={handleChange} onBlur={handleBlur} value={values.workStart} placeholder={"Heure du début du travail"}/>
                                </div>

                                <div className={"form-group"}>
                                    <div className="error">{errors.workEnd && touched.workEnd && errors.workEnd}</div>
                                    <label htmlFor="workEnd">Heure de fin du travail : </label><small className={"text-warning"}> (ex : 20h30)</small>
                                    <Field className={"form-control"} type="text" name="workEnd" onChange={handleChange} onBlur={handleBlur} value={values.workEnd} placeholder={"Heure de fin du travail"}/>
                                </div>

                                <div className={"form-group"}>
                                    <div className="error">{errors.childbirthDuration && touched.childbirthDuration && errors.childbirthDuration}</div>
                                    <label htmlFor="childbirthDuration">Durée de l'accouchement : </label><small className={"text-warning"}> (en minutes)</small>
                                    <Field className={"form-control"} type="number" name="childbirthDuration" onChange={handleChange} onBlur={handleBlur} value={values.childbirthDuration} placeholder={"Durée de l'accouchement"}/>
                                </div>

                                <div className={"form-group"}>
                                    <div className="error">{errors.height && touched.height && errors.height}</div>
                                    <label htmlFor="height">Taille : </label><small className={"text-warning"}> (en centimètre)</small>
                                    <Field className={"form-control"} type="number" name="height" onChange={handleChange} onBlur={handleBlur} value={values.height} placeholder={"Taille"}/>
                                </div>

                                <div className={"form-group"}>
                                    <div className="error">{errors.weight && touched.weight && errors.weight}</div>
                                    <label htmlFor="weight">Poids : </label><small className={"text-warning"}> (en gramme)</small>
                                    <Field className={"form-control"} type="number" name="weight" onChange={handleChange} onBlur={handleBlur} value={values.weight} placeholder={"Poids"}/>
                                </div>

                                <div className={"form-group"}>
                                    <div className="error">{errors.hairColor && touched.hairColor && errors.hairColor}</div>
                                    <label htmlFor="hairColor">Couleur des cheveux : </label>
                                    <Field className={"form-control"} type="text" name="hairColor" onChange={handleChange} onBlur={handleBlur} value={values.hairColor} placeholder={"Couleur des cheveux"}/>
                                </div>

                                <div className={"form-group"}>
                                    <div className="error">{errors.eyeColor && touched.eyeColor && errors.eyeColor}</div>
                                    <label htmlFor="eyeColor">Couleur des yeux : </label>
                                    <Field className={"form-control"} type="text" name="eyeColor" onChange={handleChange} onBlur={handleBlur} value={values.eyeColor} placeholder={"Couleur des yeux"}/>
                                </div>

                                <div className={"form-group"}>
                                    <div className="error">{errors.whereDad && touched.whereDad && errors.whereDad}</div>
                                    <label htmlFor="whereDad">Où sera le père : </label>
                                    <Field className={"form-control"} type="text" name="whereDad" onChange={handleChange} onBlur={handleBlur} value={values.whereDad} placeholder={"Où sera le père ... Surement aux toilettes"}/>
                                </div>

                            </div>
                            <div className={"w-100 w-md-75 w-lg-50 w-xl-25 px-2 px-sm-5"}>
                                <h2>Les points bonus</h2>
                                <div className="ligne"/>

                                <div className={"form-group"}>
                                    <div className="error">{errors.likeMum && touched.likeMum && errors.likeMum}</div>
                                    <label htmlFor="likeMum"><small className={"text-warning"}>Optionnel - </small> Il/Elle aura ... comme maman : </label>
                                    <Field className={"form-control"} type="text" name="likeMum" onChange={handleChange} onBlur={handleBlur} value={values.likeMum} placeholder={"Elle aura de grand cheveux, comme maman"}/>
                                </div>

                                <div className={"form-group"}>
                                    <div className="error">{errors.likeDad && touched.likeDad && errors.likeDad}</div>
                                    <label htmlFor="likeDad"><small className={"text-warning"}>Optionnel - </small> Il/Elle aura ... comme papa : </label>
                                    <Field className={"form-control"} type="text" name="likeDad" onChange={handleChange} onBlur={handleBlur} value={values.likeDad} placeholder={"Il aura un gros zizi, comme papa"}/>
                                </div>



                                <div className={"my-5"}>
                                    <button className={"btn btn-secondary w-100"} type="submit" disabled={isSubmitting}>Soumettre</button>
                                </div>
                            </div>
                        </form>
                    )}
                </Formik>
            </>
        )
    }
}

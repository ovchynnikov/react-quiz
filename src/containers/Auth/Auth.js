import React, { Component } from 'react';
import classes from './Auth.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import axios from 'axios';

function validateEmail(email) {
    const regexpEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexpEmail.test(String(email).toLowerCase());
}
/*  easy library to use -- is_js  with email func. Example: is.email(value) */

// https://console.firebase.google.com/   to get your API key //

export default class Auth extends Component {
    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Incorrect email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'Incorrect password. Enter at least 6 chars',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLegth: 6
                }
            }
        }
    }



    loginHandler = async() => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }
        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AI', authData)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    registrationHandler = async() => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }
        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AI', authData)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }

    }

    submitHandler = (event) => {
        event.preventDefault()
    }

    validateControl(value, validation) {
        if (!validation) {
            return true
        }

        let isValid = true
        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.email) {
            isValid = validateEmail(value) && isValid
        }

        if (validation.minLegth) {
            isValid = value.length >= validation.minLegth && isValid
        }

        return isValid

    }

    onChangeHandler = (event, controlName) => {


        /*  below valiables using spread operator make copy of object to prevent mutation of original objects (state)*/
        const formControls = {...this.state.formControls }
        const control = {...formControls[controlName] }

        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);

        /* control variable has changed values, let's update local formControls */
        formControls[controlName] = control;

        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls,
            isFormValid
        })
    }


    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];

            return ( <
                Input key = { controlName + index }
                type = { control.type }
                value = { control.value }
                valid = { control.valid }
                touched = { control.touched }
                label = { control.label }
                shouldValidate = {!!control.validation }
                errorMessage = { control.errorMessage }
                onChange = { event => this.onChangeHandler(event, controlName) }
                />
            )

        })
    };


    render() {
        return ( <
            div className = { classes.Auth } >
            <
            div >
            <
            h1 > Auth page < /h1>

            <
            form onSubmit = { this.submitHandler }
            className = { classes.AuthForm } >

            { this.renderInputs() }

            {
                /* <Input label="Email"
                                              
                                       />
                                       <Input label="Password" 
                                              errorMessage={'Test'}  
                                       /> */
            }

            <
            Button type = 'success'
            onClick = { this.loginHandler }
            disabled = {!this.state.isFormValid } >
            Login <
            /Button>

            <
            Button type = 'primary'
            onClick = { this.registrationHandler }
            disabled = {!this.state.isFormValid } >
            Registration <
            /Button> <
            /form> <
            /div> <
            /div>
        )
    }
}
import React from 'react'
import Input from '../../shared/components/FormElements/Input'

import { useForm } from "../../shared/hooks/form-hook"

import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../shared/Util/validators'

import Button from "../../shared/components/FormElements/Button"
import { Link } from 'react-router-dom'

const Login = () => {

    const [formState, inputHandler] = useForm(
        {
            email: {
                value: "",
                isValid: false,
            },
            password: {
                value: "",
                isValid: false,
            },
            
        },
        false
    );

    const loginHandler = (e) => {
        e.preventDefault();
        console.log(formState.inputs);
    };

    return (
        <form className="place-form" onSubmit={loginHandler}>
            <Input
                id="email"
                element="input"
                type="email"
                label="Email"
                validators={[VALIDATOR_EMAIL()]}
                errorText="Please enter a valid email address."
                onInput={inputHandler}
            />

            <Input
                id="password"
                element="input"
                label="Password"
                validators={[VALIDATOR_MINLENGTH(13)]}
                errorText="Password must be at least 13 characters"
                onInput={inputHandler}
            />

            <h6>Don't have an account yet? Get one <Link to="/register">here</Link></h6>

            <Button type="submit" disabled={!formState.isValid}>
                LOGIN
            </Button>
        </form>
    );
}

export default Login

import React, {useContext, useState} from 'react'
import Input from '../../shared/components/FormElements/Input'

import { useForm } from "../../shared/hooks/form-hook"

import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/Util/validators'

import Button from "../../shared/components/FormElements/Button"
import { Link, useNavigate } from 'react-router-dom'
import Card from '../../shared/components/UI/Card'

import {AuthContext} from "../../shared/context/auth-context"

import "./Auth.css"

const Auth = () => {
    const navigate = useNavigate();

    const auth = useContext(AuthContext);

    const [isLoginMode, setIsLoginMode] = useState(true);

    const [formState, inputHandler, setFormData] = useForm(
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

    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData({
                ...formState.inputs,
                name:undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid)
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            }, false);
        }
        setIsLoginMode(prevState => !prevState);
    }

    const authHandler = (e) => {
        e.preventDefault();
        console.log(formState.inputs);
        auth.login();
        navigate("/")
    };

    return (
        <Card className="authentication">
            <form className="place-form" onSubmit={authHandler}>
                {!isLoginMode && (
                    <Input
                        id="name"
                        element="input"
                        type="text"
                        label="Name"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a name."
                        onInput={inputHandler}
                    />
                )}
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

                <Button type="submit" disabled={!formState.isValid}>
                    {isLoginMode ? "LOGIN" : "SIGN UP"}
                </Button>
            </form>
            <Button inverse onClick={switchModeHandler}>
                {isLoginMode ? "SIGN UP" : "LOGIN"} INSTEAD
            </Button>
        </Card>
    );
}

export default Auth

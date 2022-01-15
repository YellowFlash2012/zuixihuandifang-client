import React, {useContext, useState} from 'react'
import Input from '../../shared/components/FormElements/Input'

import { useForm } from "../../shared/hooks/form-hook"

import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/Util/validators'

import Button from "../../shared/components/FormElements/Button"
import { useNavigate } from 'react-router-dom'
import Card from '../../shared/components/UI/Card'

import LoadingSpinner from "../../shared/components/UI/LoadingSpinner"
import ErrorModal from "../../shared/components/UI/ErrorModal"

import {AuthContext} from "../../shared/context/auth-context"

import "./Auth.css"
import { useHttpClient } from '../../shared/hooks/http-hook'

const Auth = () => {
    const navigate = useNavigate();

    const auth = useContext(AuthContext);

    const [isLoginMode, setIsLoginMode] = useState(true);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

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

    const authHandler = async (e) => {
        e.preventDefault();

        if (isLoginMode) {
            try {
                await sendRequest(
                    "http://localhost:5000/api/users/login",
                    "POST",
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value,
                    }),
                    {
                        "Content-Type": "application/json",
                    },
                    
                );

                auth.login();
            } catch (error) {
                console.log(error);
            }
                
        } else {
            
            try {
                const res = await sendRequest(
                    "http://localhost:5000/api/users/signup",
                    
                        "POST",
                        {
                            "Content-Type": "application/json",
                        },
                        JSON.stringify({
                            name: formState.inputs.name.value,
                            email: formState.inputs.email.value,
                            password: formState.inputs.password.value,
                        }),
                    
                );

                console.log(res);
                auth.login();

            } catch (err) {
                console.log(err);
                
            }
        }

        console.log(formState.inputs);
        
        navigate("/")
    };


    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            <Card className="authentication">
                {isLoading && <LoadingSpinner asOverlay />}

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
                        type="password"
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
        </>
    );
}

export default Auth

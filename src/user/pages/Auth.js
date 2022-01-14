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

const Auth = () => {
    const navigate = useNavigate();

    const auth = useContext(AuthContext);

    const [isLoginMode, setIsLoginMode] = useState(true);

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState();

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

        setIsLoading(true);

        if (isLoginMode) {
            try {
                const res = await fetch(
                    "http://localhost:5000/api/users/login",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            
                            email: formState.inputs.email.value,
                            password: formState.inputs.password.value,
                        }),
                    }
                );

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message);
                }

                console.log(data);
                setIsLoading(false);
                auth.login();
            } catch (err) {
                console.log(err);
                setError(
                    err.message || "Something went wrong, please try again!"
                );
            }
        } else {
            
            try {
                const res = await fetch(
                    "http://localhost:5000/api/users/signup",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            name: formState.inputs.name.value,
                            email: formState.inputs.email.value,
                            password: formState.inputs.password.value,
                        }),
                    }
                );

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message)
                }

                console.log(data);
                setIsLoading(false);
                auth.login();

            } catch (err) {
                console.log(err);
                setError(err.message || "Something went wrong, please try again!");
            }
        }

        console.log(formState.inputs);
        
        navigate("/")
    };

    const errorHandler = () => {
        setError(null);
    }

    return (
        <>
            <ErrorModal error={error} onClear={errorHandler} />
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

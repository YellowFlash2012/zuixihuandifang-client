import React, { useContext } from 'react'

import Input from '../../shared/components/FormElements/Input'

import Button from "../../shared/components/FormElements/Button"

import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/Util/validators'

import "./NewPlace.css"
import { useForm } from '../../shared/hooks/form-hook'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { AuthContext } from '../../shared/context/auth-context'
import { useNavigate } from 'react-router-dom'
import ErrorModal from '../../shared/components/UI/ErrorModal'
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner'



const NewPlace = () => {

    const auth = useContext(AuthContext);

    const navigate = useNavigate();

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [formState, inputHandler] = useForm({
        title: {
            value: "",
            isValid: false,
        },
        description: {
            value: "",
            isValid: false,
        },
        address: {
            value: "",
            isValid: false,
        },
    }, false);

    
    
    const formSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            await sendRequest(
                "http://localhost:5000/api/places",
                "POST",
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value,
                    address: formState.inputs.address.value,
                    creator: auth.userId,
                }), {'Content-Type':'application/json'}
            );
            navigate("/");
        } catch (error) {
            console.log(error);
        }
        
        console.log(formState.inputs);

    }

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />

            <form className="place-form" onSubmit={formSubmitHandler}>

                {isLoading && <LoadingSpinner asOverlay />}
                <Input
                    id="title"
                    element="input"
                    type="text"
                    label="Title"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid text."
                    onInput={inputHandler}
                />

                <Input
                    id="description"
                    element="description"
                    label="Description"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter a valid description (at least 5 characters)."
                    onInput={inputHandler}
                />

                <Input
                    id="address"
                    element="input"
                    label="Address"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid address."
                    onInput={inputHandler}
                />

                <Button type="submit" disabled={!formState.isValid}>
                    ADD YOUR PLACE
                </Button>
            </form>
        </>
    );
}

export default NewPlace

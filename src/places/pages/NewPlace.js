import React, { useCallback, useReducer } from 'react'

import Input from '../../shared/components/FormElements/Input'

import Button from "../../shared/components/FormElements/Button"

import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/Util/validators'

import "./NewPlace.css"
import { useForm } from '../../shared/hooks/form-hook'



const NewPlace = () => {

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

    
    
    const formSubmitHandler = e => {
        e.preventDefault();
        console.log(formState.inputs);

    }

    return (
        <form className='place-form' onSubmit={formSubmitHandler}>
            <Input
                id="title"
                element='input' type="text" label="Title" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a valid text."
            onInput={inputHandler}
            />
            
            <Input
                id="description"
                element='description' label="Description" validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description (at least 5 characters)."
            onInput={inputHandler}
            />
            
            <Input
                id="address"
                element='input' label="Address" validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid address."
            onInput={inputHandler}
            />

            <Button type="submit" disabled={!formState.isValid}>ADD YOUR PLACE</Button>
        </form>
    )
}

export default NewPlace

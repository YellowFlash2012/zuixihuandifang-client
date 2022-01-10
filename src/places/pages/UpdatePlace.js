import React, {useState, useEffect} from 'react'

import { useParams } from 'react-router-dom'

import Button from '../../shared/components/FormElements/Button';

import Input from '../../shared/components/FormElements/Input';

import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/Util/validators';

import { places } from "./UserPlaces"

import './NewPlace.css'
import { useForm } from '../../shared/hooks/form-hook';
import Card from '../../shared/components/UI/Card';

const UpdatePlace = () => {

    const [isLoading, setIsLoading] = useState(true);

    const placeId = useParams().placeId;

    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    }, false);

    const placeToUpdate = places.find((p) => p.id === placeId);

    useEffect(() => {
        if (placeToUpdate) {
            
            setFormData(
                {
                    title: {
                        value: placeToUpdate.title,
                        isValid: true,
                    },
                    description: {
                        value: placeToUpdate.description,
                        isValid: false,
                    },
                },
                true
            )
        };
        setIsLoading(false);
    }, [setFormData, placeToUpdate])

    if (!placeToUpdate) {
        return (
            <div className="center">
                <Card>
                    <h2>Such place doesn't exist. Please try again!</h2>
                </Card>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="center">
                <h2>Loading...</h2>
            </div>
        );
    }

    const placeUpdateSubmit = (e) => {
        e.preventDefault();

        console.log(formState.inputs);
    }

    return (
        <div>
            <form
                className="place-form"
                onSubmit={placeUpdateSubmit}
            >
                <Input
                    id="title"
                    element="input"
                    type="text"
                    label="Title"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid title"
                    onInput={inputHandler}
                    initialValue={formState.inputs.title.value}
                    initialValid={formState.inputs.title.isValid}
                />

                <Input
                    id="description"
                    element="textarea"
                    label="Description"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter a valid description {min. 5 characters}."
                    onInput={inputHandler}
                    initialValue={formState.inputs.description.value}
                    initialValid={formState.inputs.description.isValid}
                />

                <Button type="submit" disabled={!formState.isValid}>
                    UPDATE YOUR PLACE
                </Button>
            </form>
        </div>
    );
}

export default UpdatePlace

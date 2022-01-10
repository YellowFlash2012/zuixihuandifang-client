import React, { useState } from 'react'
import Card from '../../shared/components/UI/Card'

import Button from "../../shared/components/FormElements/Button"

import Modal from '../../shared/components/UI/Modal'

import "./PlaceItem.css"
import Map from '../../shared/components/UI/Map'

const PlaceItem = (props) => {

    const [showMap, setShowMap] = useState(false);

    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const openMap = () => setShowMap(true);

    const closeMap = () => setShowMap(false);

    const showDeleteWarning = () => {
        setShowConfirmModal(true);
    }

    const cancelDeleteHandler = () => {
        setShowConfirmModal(false);
    }

    const confirmDelete = () => {
        setShowConfirmModal(false);
        console.log('DELETING...');
    }

    return (
        <>
            <Modal
                show={showMap}
                onCancel={closeMap}
                header={props.address}
                contentClass="place-item__modal-content"
                footerClass="place-item__modal-actions"

                footer={<Button onClick={closeMap}>CLOSE</Button>}
            >
                <div className="map-container">
                    <Map center={props.coordinates} zoom={18} />
                </div>
            </Modal>

            <Modal
                show={showConfirmModal}
                onCancel={cancelDeleteHandler}
                header="Slow down please!" footerClass="place-item__modal-actions"
                footer={
                    <>
                        <Button
                            inverse
                            onClick={cancelDeleteHandler}
                        >
                            CANCEL
                        </Button>

                        <Button
                            danger
                            onClick={confirmDelete}
                        >
                            DELETE
                        </Button>
                    </>
                }
            >
                <p>You sure about that? There is no going back!</p>
            </Modal>

            <li className="place-item">
                <Card className="place-item__content">
                    <div className="place-item__image">
                        <img src={props.image} alt={props.title} />
                    </div>

                    <div className="place-item__info">
                        <h2>{props.title}</h2>

                        <h3>{props.address}</h3>

                        <p>{props.description}</p>
                    </div>

                    <div className="place-item__actions">
                        <Button
                            inverse
                            onClick={openMap}
                        >
                            VIEW ON MAP
                        </Button>

                        <Button to={`/places/${props.id}`}>EDIT</Button>

                        <Button
                            danger
                            onClick={showDeleteWarning}
                        >
                            DELETE
                        </Button>
                    </div>
                </Card>
            </li>
        </>
    );
}

export default PlaceItem

import React from 'react';
import CardModal from '../modals/cardModal';
import CardNameModal from '../modals/cardNameModal';
import { useState } from 'react';

export default function Card({ card, cardIndex, columnIndex, appState, setAppState }) {

    const [cardModalIsOpen, setCardModalOpen] = useState(false)
    const [cardNameModalIsOpen, setCardNameModalOpen] = useState(false);

    return (
        <>
            <div className='card'>
                <p onClick={() => setCardModalOpen(true)}>{card.name}</p>
                <i className='fas fa-pen' onClick={() => setCardNameModalOpen(true)}></i>
            </div>

            <CardModal card={card} cardIndex={cardIndex} columnIndex={columnIndex} appState={appState}
                setAppState={setAppState} cardModalIsOpen={cardModalIsOpen} setCardModalOpen={setCardModalOpen} />
            <CardNameModal card={card} cardIndex={cardIndex} columnIndex={columnIndex} appState={appState}
                setAppState={setAppState} cardNameModalIsOpen={cardNameModalIsOpen} setCardNameModalOpen={setCardNameModalOpen} />
        </>
    )

}

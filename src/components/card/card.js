import React from 'react'

export default function Card({ content }) {
    // console.log(content);
    return (
    <div className='card'>
        <p>{content.name}</p>
    </div>)

}

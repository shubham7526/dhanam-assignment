import React from 'react';
import "./Event.css";

const Event = ({data})=>{

    const {title, date, notes, bunting} = data;

    return (
        <div className = "event_body">
            <div className="d-flex justify-content-between">
                <div><h4>{title}</h4></div>
                <div>{date}</div>
            </div>
            <div>Notes: {notes}</div>
            <div>Bunting: {bunting}</div>
        </div>
    )
}

export default Event;
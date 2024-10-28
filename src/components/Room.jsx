import React from 'react';

    const Room = ({ patient, onClick }) => {
      return (
        <div className="room" onClick={onClick}>
          <h2>Room {patient.room + 1}</h2>
          {patient.isEmpty ? <p>Empty</p> : <p>Occupied by {patient.name}</p>}
        </div>
      );
    };

    export default Room;

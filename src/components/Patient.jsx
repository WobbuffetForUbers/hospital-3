import React from 'react';

    const Patient = ({ patient }) => {
      return (
        <div className="patient">
          <h3>{patient.name}</h3>
          <p>Condition: {patient.condition}</p>
          <p>Personality: {patient.personality}</p>
        </div>
      );
    };

    export default Patient;

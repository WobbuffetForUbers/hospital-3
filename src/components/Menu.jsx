import React from 'react';

    const Menu = ({ onSelect, getResponse, getExaminationResult, interviewQuestions, examinationManeuvers, specialties, setUsedSpecialty }) => {
      const diagnosisOptions = ['Flu', 'Hypertension', 'Allergy'];

      return (
        <div className="menu">
          <h3>Interview Questions</h3>
          <ul>
            {interviewQuestions.map((question, index) => (
              <li key={index} onClick={() => onSelect(getResponse(question))}>{question}</li>
            ))}
          </ul>
          <h3>Examination Maneuvers</h3>
          <ul>
            {examinationManeuvers.map((maneuver, index) => (
              <li key={index} onClick={() => onSelect(getExaminationResult(maneuver))}>{maneuver}</li>
            ))}
          </ul>
          <h3>Diagnosis Options</h3>
          <ul>
            {diagnosisOptions.map((diagnosis, index) => (
              <li key={index} onClick={() => onSelect(diagnosis)}>{diagnosis}</li>
            ))}
          </ul>
          <h3>Specialty Referrals</h3>
          <ul>
            {specialties.map((specialty, index) => (
              <li key={index} onClick={() => setUsedSpecialty(specialty)}>{specialty}</li>
            ))}
          </ul>
        </div>
      );
    };

    export default Menu;

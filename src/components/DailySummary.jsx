import React from 'react';

    const DailySummary = ({ onEndOfDay, onPurchaseSpecialty, onPurchaseInterviewQuestion, onPurchaseExaminationManeuver }) => {
      return (
        <div className="daily-summary">
          <h2>End of Day Summary</h2>
          <button onClick={onEndOfDay}>Continue to Next Day</button>
          <h3>Purchase Options</h3>
          <button onClick={() => onPurchaseSpecialty('Cardiology')}>Unlock Cardiology</button>
          <button onClick={() => onPurchaseSpecialty('Gastroenterology')}>Unlock Gastroenterology</button>
          <button onClick={() => onPurchaseSpecialty('Neurology')}>Unlock Neurology</button>
          <button onClick={() => onPurchaseInterviewQuestion('Have you experienced any dizziness?')}>Add Interview Question</button>
          <button onClick={() => onPurchaseInterviewQuestion('Have you had any recent travel?')}>Add Interview Question</button>
          <button onClick={() => onPurchaseExaminationManeuver('Check blood pressure')}>Add Exam Maneuver</button>
          <button onClick={() => onPurchaseExaminationManeuver('Examine abdomen')}>Add Exam Maneuver</button>
        </div>
      );
    };

    export default DailySummary;

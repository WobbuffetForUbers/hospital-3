import React, { useState } from 'react';
    import Menu from './Menu';

    const PatientEncounter = ({ patient, onClose, onSubmitDiagnosis, interviewQuestions, examinationManeuvers, specialties, setTimeRemaining }) => {
      const [selectedOption, setSelectedOption] = useState(null);
      const [usedSpecialty, setUsedSpecialty] = useState(null);

      const handleMenuSelect = (option) => {
        setSelectedOption(option);
      };

      const handleSubmit = () => {
        onSubmitDiagnosis(patient, selectedOption, usedSpecialty);
      };

      const getResponse = (question) => {
        setTimeRemaining(prev => prev - 1); // Move time forward by 1 second
        const responses = {
          'Friendly': {
            'How are you feeling?': 'I’m feeling okay, just a bit under the weather.',
            'Any recent changes in your health?': 'Not really, just this recent issue.',
            'Do you have any allergies?': 'No allergies that I know of.'
          },
          'Anxious': {
            'How are you feeling?': 'I’m really worried about my symptoms.',
            'Any recent changes in your health?': 'Yes, I’ve been feeling more anxious lately.',
            'Do you have any allergies?': 'I’m not sure, I’m worried I might.'
          },
          'Stoic': {
            'How are you feeling?': 'I’m fine, it’s nothing I can’t handle.',
            'Any recent changes in your health?': 'No, everything’s been the same.',
            'Do you have any allergies?': 'No, I don’t have any allergies.'
          }
        };

        return responses[patient.personality][question];
      };

      const getExaminationResult = (maneuver) => {
        setTimeRemaining(prev => prev - 2); // Move time forward by 2 seconds
        const results = {
          'Flu': {
            'Check pulse': 'Pulse is slightly elevated.',
            'Listen to heart': 'Heart sounds normal.',
            'Examine throat': 'Throat is red and inflamed.'
          },
          'Hypertension': {
            'Check pulse': 'Pulse is strong and regular.',
            'Listen to heart': 'Heart sounds normal.',
            'Examine throat': 'Throat appears normal.'
          },
          'Allergy': {
            'Check pulse': 'Pulse is normal.',
            'Listen to heart': 'Heart sounds normal.',
            'Examine throat': 'Throat is slightly swollen.'
          }
        };

        return results[patient.condition][maneuver];
      };

      return (
        <div className="patient-encounter">
          <h2>{patient.name}</h2>
          <p>Symptom: {patient.symptoms[0]}</p>
          <Menu 
            onSelect={handleMenuSelect} 
            getResponse={getResponse} 
            getExaminationResult={getExaminationResult}
            interviewQuestions={interviewQuestions}
            examinationManeuvers={examinationManeuvers}
            specialties={specialties}
            setUsedSpecialty={setUsedSpecialty}
          />
          {selectedOption && <p>Selected: {selectedOption}</p>}
          <button onClick={handleSubmit}>Submit Diagnosis</button>
          <button onClick={onClose}>Close</button>
        </div>
      );
    };

    export default PatientEncounter;

import React, { useState, useEffect } from 'react';
    import Room from './components/Room';
    import PatientEncounter from './components/PatientEncounter';
    import DailySummary from './components/DailySummary';
    import './App.css';

    const App = () => {
      const [patients, setPatients] = useState([]);
      const [selectedPatient, setSelectedPatient] = useState(null);
      const [reputation, setReputation] = useState(60); // Start with 60/100 reputation
      const [day, setDay] = useState(1);
      const [showSummary, setShowSummary] = useState(false);
      const [specialties, setSpecialties] = useState([]);
      const [interviewQuestions, setInterviewQuestions] = useState(['How are you feeling?', 'Any recent changes in your health?', 'Do you have any allergies?']);
      const [examinationManeuvers, setExaminationManeuvers] = useState(['Check pulse', 'Listen to heart', 'Examine throat']);
      const [timeRemaining, setTimeRemaining] = useState(360); // 6 minutes in seconds
      const [revenue, setRevenue] = useState(0);

      useEffect(() => {
        const timer = setInterval(() => {
          setTimeRemaining(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              setShowSummary(true);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        const patientArrivalInterval = setInterval(() => {
          if (patients.length < 15) {
            setPatients(prevPatients => [...prevPatients, generatePatient(prevPatients.length)]);
          }
        }, 24000); // New patient every 24 seconds

        return () => {
          clearInterval(timer);
          clearInterval(patientArrivalInterval);
        };
      }, [patients]);

      const generatePatient = (index) => {
        const personalities = ['Friendly', 'Anxious', 'Stoic'];
        const diagnoses = ['Flu', 'Hypertension', 'Allergy'];

        return {
          id: index,
          name: `Patient ${index + 1}`,
          condition: diagnoses[index % diagnoses.length],
          symptoms: [`Symptom ${index + 1}`],
          room: index,
          personality: personalities[index % personalities.length],
          correctDiagnosis: diagnoses[index % diagnoses.length],
          isEmpty: false,
        };
      };

      const handleRoomClick = (patient) => {
        if (!patient.isEmpty) {
          setSelectedPatient(patient);
        }
      };

      const closeEncounter = () => {
        setSelectedPatient(null);
      };

      const handleDiagnosisSubmission = (patient, submittedDiagnosis, usedSpecialty) => {
        const baseRevenue = {
          'Flu': 50,
          'Hypertension': 100,
          'Allergy': 75
        };

        let diagnosisRevenue = baseRevenue[submittedDiagnosis];
        if (submittedDiagnosis === patient.correctDiagnosis) {
          alert('Correct diagnosis! Reputation increased.');
          setReputation(prev => Math.min(prev + 5, 100)); // Increase reputation
          if (usedSpecialty) {
            diagnosisRevenue *= 1.5; // Boost revenue with specialty
            if (usedSpecialty === 'Cardiology' && patient.condition === 'Hypertension') {
              setReputation(prev => Math.min(prev + 10, 100)); // Bonus reputation for related specialty
            } else {
              setReputation(prev => Math.max(prev - 10, 0)); // Penalty for unrelated specialty
            }
          }
          const finalRevenue = diagnosisRevenue * (reputation / 100);
          setRevenue(prev => prev + finalRevenue);
        } else {
          alert('Incorrect diagnosis. Try again.');
          setReputation(prev => Math.max(prev - 5, 0)); // Decrease reputation
        }
        setTimeout(() => {
          setPatients(patients.map(p => 
            p.id === patient.id ? { ...p, isEmpty: true } : p
          ));
          closeEncounter();
        }, 5000); // Patient leaves after 5 seconds
      };

      const handleEndOfDay = () => {
        setShowSummary(false);
        setDay(day + 1);
        setTimeRemaining(360); // Reset time for the new day
        setPatients([]); // Clear patients for the new day
      };

      const endShift = () => {
        setShowSummary(true);
      };

      const purchaseSpecialty = (specialty) => {
        setSpecialties([...specialties, specialty]);
      };

      const purchaseInterviewQuestion = (question) => {
        setInterviewQuestions([...interviewQuestions, question]);
      };

      const purchaseExaminationManeuver = (maneuver) => {
        setExaminationManeuvers([...examinationManeuvers, maneuver]);
      };

      const getRoomStatus = (index) => {
        const patient = patients.find(p => p.room === index);
        return patient ? patient : { isEmpty: true, room: index };
      };

      return (
        <div>
          <h1>Hospital Tycoon</h1>
          <p>Reputation: {reputation}/100</p>
          <p>Day: {day}</p>
          <p>Time Remaining: {Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, '0')}</p>
          <p>Revenue: ${revenue.toFixed(2)}</p>
          <button onClick={endShift}>End Shift</button>
          <div className="square-layout">
            {Array.from({ length: 15 }).map((_, index) => (
              <Room key={index} patient={getRoomStatus(index)} onClick={() => handleRoomClick(getRoomStatus(index))} />
            ))}
          </div>
          {selectedPatient && (
            <PatientEncounter 
              patient={selectedPatient} 
              onClose={closeEncounter} 
              onSubmitDiagnosis={handleDiagnosisSubmission} 
              interviewQuestions={interviewQuestions}
              examinationManeuvers={examinationManeuvers}
              specialties={specialties}
              setTimeRemaining={setTimeRemaining}
            />
          )}
          {showSummary && (
            <DailySummary 
              onEndOfDay={handleEndOfDay} 
              onPurchaseSpecialty={purchaseSpecialty}
              onPurchaseInterviewQuestion={purchaseInterviewQuestion}
              onPurchaseExaminationManeuver={purchaseExaminationManeuver}
            />
          )}
        </div>
      );
    };

    export default App;

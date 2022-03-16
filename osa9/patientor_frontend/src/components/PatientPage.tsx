import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { Entry, Patient } from '../types';
import { Icon } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { Entries } from '../components/Entries';
import EntryTypes from './EntryTypes';
import { OHCValues } from './OHCForm';
import { HospitalValues } from './HospitalForm';
import { HealthCheckValues } from './CheckForm';

const PatientPage = () => {
  const [state, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [display, setDisplay] = React.useState<boolean>(false);
  const [allDiagnoses, setAllDiagnoses] = React.useState([{code: 'code', name: 'name'}]);
  const [displayForm, setDisplayForm] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>();

  React.useEffect(() => {
    void fetchDiagnoses();
    void fetchPatient();
  }, []);

  const fetchDiagnoses = async () => {
    try {
      const diagnoses = await axios.get(`${apiBaseUrl}/diagnoses`);
      setAllDiagnoses(diagnoses.data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchPatient = async () => {
    try {
      const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      dispatch({ type: "DISPLAY_PATIENT", payload: patient });
    } catch (e) {
      console.error(e);
    }
    setDisplay(true);
  };

  const addEntry = async (values: OHCValues | HospitalValues | HealthCheckValues) => {
    try {
      await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, values);
      closeForm();
      void fetchPatient();
    } catch (e) {
      console.error(e);
    }
  };

  // eslint-disable-next-line
  const openForm = (event: any) => {
    setTitle(event.target.name);
    setDisplayForm(true);
  };

  const closeForm = () => {
    setDisplayForm(false);
  };

  if (display) {
    return (
      <div>
        <h2>{state.patients[id].name}
        {state.patients[id].gender === 'male' ? <Icon name='mars' /> : <Icon name='venus' />}</h2>
        <p>ssn: {state.patients[id].ssn}
        <br/>occupation: {state.patients[id].occupation}</p>
        
        <h3>entries</h3>
        
        {state.patients[id].entries.map(entries =>
          <div key={entries.id}>
          <EntryTypes
            date={entries.date}
            description={entries.description}
            type={entries.type}
            employerName={entries.employerName} 
            diagnosisCodes={entries.diagnosisCodes}
            allDiagnoses={allDiagnoses}
          />
          </div>)}

        <Button onClick={openForm} name='Add Occupational Health Care Entry'>Add Occupational Health Care Entry</Button>
        <Button onClick={openForm} name='Add Hospital Entry'>Add Hospital Entry</Button>
        <Button onClick={openForm} name='Add Health Check Entry'>Add Health Check Entry</Button>

        <Entries
          title={title}
          modalOpen={displayForm}
          onClose={closeForm}
          onSubmit={addEntry}
          allDiagnoses={allDiagnoses}
        />

      </div>
    );
  }

  return (
    <></>
  );
};
  
export default PatientPage;
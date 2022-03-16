import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Diagnosis } from '../types';

interface Props {
  date: string;
  description: string;
  type: string;
  employerName: string | undefined;
  diagnosisCodes: string[] | undefined;
  allDiagnoses: Diagnosis[];
}

const EntryTypes = (props: Props) => {
  const [diagnoseArray, setDiagnoses] = React.useState<Diagnosis[]>();
  
  React.useEffect(() => {
    const array = [];
    if (props.diagnosisCodes) {
      for (const code of props.diagnosisCodes) {
        const diagnose = props.allDiagnoses.find(diagnose => diagnose.code === code);
        if (diagnose) {
          array.push(diagnose);
        }
      }
    }
    setDiagnoses(array);
  }, []);
  
  const Entrydetails = () => {
    switch (props.type) {
    case 'Hospital':
      return <Icon name='hospital' size='big' />;
    case 'OccupationalHealthcare':
      return <Icon name='stethoscope' size='big' />;
    case 'HealthCheck':
      return <Icon name='doctor' size='big' />;
    default:
      return <Icon name='doctor' size='big'/>;
    }
  };

  return (
    <div style={{border: 'solid lightgray', padding: 10, marginBottom: 10, borderRadius: 5}}>
      <h4>{props.date} <Entrydetails /> {props.employerName}</h4>
      <i>{props.description}</i>
      <ul>{diagnoseArray?.map((d, i) => <li key={i}>{d.code} {d.name}</li>)}</ul>
    </div>
  );
};

export default EntryTypes;
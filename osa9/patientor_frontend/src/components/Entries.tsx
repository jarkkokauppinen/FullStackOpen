import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { OHCForm, OHCValues } from './OHCForm';
import { HospitalForm, HospitalValues } from './HospitalForm';
import { CheckForm, HealthCheckValues } from './CheckForm';
import { Diagnosis } from '../types';

interface Props {
  title?: string
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: OHCValues | HospitalValues | HealthCheckValues) => void;
  error?: string;
  allDiagnoses: Diagnosis[];
}

export const Entries = ({ title, allDiagnoses, modalOpen, onClose, onSubmit, error }: Props) => {
  switch (title) {
    case 'Add Occupational Health Care Entry':
      return <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
            <Modal.Header>{title}</Modal.Header>
            <Modal.Content>
              {error && <Segment inverted color='red'>{`Error: ${error}`}</Segment>}
              <OHCForm allDiagnoses={allDiagnoses} onSubmit={onSubmit} onClose={onClose} />
            </Modal.Content>
          </Modal>;
    
    case 'Add Hospital Entry':
      return <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
            <Modal.Header>{title}</Modal.Header>
            <Modal.Content>
              {error && <Segment inverted color='red'>{`Error: ${error}`}</Segment>}
              <HospitalForm allDiagnoses={allDiagnoses} onSubmit={onSubmit} onClose={onClose} />
            </Modal.Content>
          </Modal>;
    
    case 'Add Health Check Entry':
      return <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
            <Modal.Header>{title}</Modal.Header>
            <Modal.Content>
              {error && <Segment inverted color='red'>{`Error: ${error}`}</Segment>}
              <CheckForm allDiagnoses={allDiagnoses} onSubmit={onSubmit} onClose={onClose} />
            </Modal.Content>
          </Modal>;
  }
  
  return null;
};
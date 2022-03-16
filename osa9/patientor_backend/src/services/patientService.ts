import patients from '../../data/patients';
import { Patient, PublicPatient, NewPatient, EntriesHealthCare, EntriesHospital, EntriesHealthCheck, Entry } from '../types';
import {v1 as uuid} from 'uuid';

const getPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getSinglePatient = (id: string): Patient | undefined => {
  const patient = patients.find(patient => patient.id === id);
  return patient;
};

const addPatient = ( rest: NewPatient ): Patient => {
  const newID = uuid();
  const newPatient = {
    id: newID,
    ...rest
  };

  newPatient.entries = [];

  patients.push(newPatient);
  return newPatient;
};

const addEntries = (e: EntriesHealthCare | EntriesHospital | EntriesHealthCheck, userID: string): Entry => {
  const generateID = uuid();
  
  const entries = {
    id: generateID,
    ...e
  };

  const patient = getSinglePatient(userID);
  
  if (patient) {
    const updatedPatient = {
      id: patient.id,
      name: patient.name,
      dateOfBirth: patient.dateOfBirth,
      ssn: patient.ssn,
      gender: patient.gender,
      occupation: patient.occupation,
      entries: patient.entries.concat(entries)
    };

    patients.splice(patients.indexOf(patient), 1, updatedPatient);
  }

  return entries;
};

export default {
  getPatients,
  getSinglePatient,
  addPatient,
  addEntries
};
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import express from 'express';
import patientService from '../services/patientService';
import newPatientUtils from '../utils';

const router = express.Router();

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientService.getSinglePatient(id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.post('/', (req, res) => {
  try {
    const newPatient = newPatientUtils(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/:id/entries', (req, res) => {
  const id = req.params.id;
  const entries = req.body;
  
  try {
    const addedEntries = patientService.addEntries(entries, id);
    if (!addedEntries.date || !addedEntries.description || !addedEntries.specialist) {
      res.json('missing field');
    }
    res.json(addedEntries);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
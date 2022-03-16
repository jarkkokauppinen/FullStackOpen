/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const height = req.query['height'];
  const weight = req.query['weight'];
  const index = calculateBmi(Number(height), Number(weight));
  
  const object = {
    weight: weight,
    height: height,
    bmi: index
  };

  if (isNaN(Number(weight)) || weight === null || isNaN(Number(height)) || height === null) {
    res.status(400).json({ error: 'malformatted parameters' });
  } else {
    res.send(object);
  }
});

app.post('/exercises', (req, res) => {
  if (!req.body.daily_exercises || !req.body.target) {
    res.status(401).json({ error: 'parameters missing' });
  }

  const array = req.body.daily_exercises;
  array.unshift(req.body.target);

  for (const number of array) {
    if (isNaN(Number(number))) {
      res.status(400).json({ error: 'malformatted parameters' });
    }
  }

  array.unshift('first to remove');
  array.unshift('second to remove');
  res.send(calculateExercises(array));
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
import React from 'react';
import { Field, Formik, Form } from 'formik';
import { Grid, Button } from 'semantic-ui-react';
import { DiagnosisSelection, TextField, NumberField } from '../AddPatientModal/FormField';
import { HealthCheck, Diagnosis } from '../types';

export type HealthCheckValues = Omit<HealthCheck, 'id'>;

interface Props {
  onSubmit: (values: HealthCheckValues) => void;
  onClose: () => void;
  allDiagnoses: Diagnosis[];
}

export const CheckForm = ({ allDiagnoses, onSubmit, onClose }: Props) => {
  return (
    <Formik
    initialValues={{
      type: 'HealthCheck',
      date: '',
      description: '',
      specialist: '',
      healthCheckRating: 0
    }}
    onSubmit={onSubmit}
    validate={values => {
      const requiredError = 'Field is required';
      const errors: { [field: string]: string } = {};
      if (!values.date) {
        errors.date = requiredError;
      }
      if (!Date.parse(values.date)) {
        errors.date = 'Date is formatted incorrectly';
      }
      if (!values.description) {
        errors.description = requiredError;
      }
      if (!values.specialist) {
        errors.specialist = requiredError;
      }
      return errors;
    }}>
    {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
      return (
        <Form className='form ui'>
          <Field
            label='Date'
            placeholder='YYYY-MM-DD'
            name='date'
            component={TextField}
          />
          <Field
            label='Description'
            placeholder='Description'
            name='description'
            component={TextField}
          />
          <Field
            label='Specialist'
            placeholder='Specialist'
            name='specialist'
            component={TextField}
          />
          <Field
            label='Employer Name'
            placeholder='Employer Name'
            name='employerName'
            component={TextField}
          />
          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(allDiagnoses)}
          />
          <Field
            label='Health Check Rating'
            name='healthCheckRating'
            component={NumberField}
            min={0}
            max={3}
          />
          <Grid>
            <Grid.Column floated='left' width={5}>
              <Button type='button' onClick={onClose} color='red'>
                Cancel
              </Button>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Button
                type='submit'
                floated='right'
                color='green'
                disabled={!dirty || !isValid}>
                Add
              </Button>
            </Grid.Column>
          </Grid>
        </Form>
      );
    }}
  </Formik>
  );
};
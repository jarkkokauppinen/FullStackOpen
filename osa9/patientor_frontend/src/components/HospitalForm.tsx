import React from 'react';
import { Field, Formik, Form } from 'formik';
import { Grid, Button } from 'semantic-ui-react';
import { DiagnosisSelection, TextField } from '../AddPatientModal/FormField';
import { HospitalEntry, Diagnosis } from '../types';

export type HospitalValues = Omit<HospitalEntry, 'id'>;

interface Props {
  onSubmit: (values: HospitalValues) => void;
  onClose: () => void;
  allDiagnoses: Diagnosis[];
}

export const HospitalForm = ({ allDiagnoses, onSubmit, onClose }: Props) => {
  return (
    <Formik
    initialValues={{
      type: 'Hospital',
      date: '',
      description: '',
      specialist: ''
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
          <Field
            label='Discharge Date'
            placeholder='Discharge Date'
            name='discharge.date'
            component={TextField}
          />
          <Field
            label='Discharge Criteria'
            placeholder='Discharge Criteria'
            name='discharge.criteria'
            component={TextField}
          />
          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(allDiagnoses)}
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
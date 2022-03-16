export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

interface BaseEntry {
  id: string;
  type: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: string[];
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

interface OccupationalHealthCareEntry extends BaseEntry {
  sickLeave?: SickLeave;
  employerName: string;
}

interface Discharge {
  date: string;
  criteria: string;
}

interface HospitalEntry extends BaseEntry {
  discharge?: Discharge;
  employerName?: string;
}

enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheck extends BaseEntry {
  employerName?: string;
  healthCheckRating: HealthCheckRating;
}

export type Entry = OccupationalHealthCareEntry | HospitalEntry | HealthCheck;

export type EntriesHealthCare = Omit<OccupationalHealthCareEntry, 'id'>;

export type EntriesHospital = Omit<HospitalEntry, 'id'>;

export type EntriesHealthCheck = Omit<HealthCheck, 'id'>;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[]
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id'>;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const getPatients = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const getSinglePatient = (id) => {
    const patient = patients_1.default.find(patient => patient.id === id);
    return patient;
};
const addPatient = (rest) => {
    const newID = (0, uuid_1.v1)();
    const newPatient = Object.assign({ id: newID }, rest);
    newPatient.entries = [];
    patients_1.default.push(newPatient);
    return newPatient;
};
const addEntries = (e, userID) => {
    const generateID = (0, uuid_1.v1)();
    const entries = Object.assign({ id: generateID }, e);
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
        patients_1.default.splice(patients_1.default.indexOf(patient), 1, updatedPatient);
    }
    return entries;
};
exports.default = {
    getPatients,
    getSinglePatient,
    addPatient,
    addEntries
};

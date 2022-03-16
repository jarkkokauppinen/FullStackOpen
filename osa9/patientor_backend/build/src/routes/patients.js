"use strict";
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const patient = patientService_1.default.getSinglePatient(id);
    if (patient) {
        res.send(patient);
    }
    else {
        res.sendStatus(404);
    }
});
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getPatients());
});
router.post('/', (req, res) => {
    try {
        const newPatient = (0, utils_1.default)(req.body);
        const addedPatient = patientService_1.default.addPatient(newPatient);
        res.json(addedPatient);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
router.post('/:id/entries', (req, res) => {
    const id = req.params.id;
    const entries = req.body;
    try {
        const addedEntries = patientService_1.default.addEntries(entries, id);
        if (!addedEntries.date || !addedEntries.description || !addedEntries.specialist) {
            res.json('missing field');
        }
        res.json(addedEntries);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.default = router;

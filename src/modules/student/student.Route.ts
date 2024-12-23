import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();
//will call controller func
router.post('/', StudentControllers.createStudent);
router.get('/', StudentControllers.getAllStudentFromDB);
export const StudentRoutes = router;

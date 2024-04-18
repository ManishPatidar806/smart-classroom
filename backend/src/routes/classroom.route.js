import { Router } from 'express';
import { createClassroom, getClassroom, enrollAssignment, getAssignments } from "../controllers/classroom.controller.js"
// createAssignment
const classroomRouter = Router();

classroomRouter.post('/', getClassroom);
classroomRouter.post('/create', createClassroom);
classroomRouter.post('/:classId/enroll', enrollAssignment);
classroomRouter.post('/:classId/assignments', getAssignments);

export default classroomRouter;
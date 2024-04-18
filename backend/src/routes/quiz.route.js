import {Router} from "express"
// import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createQuiz, getQuiz, submitQuiz, quizResult} from "../controllers/quiz.controller.js"

const quizRouter = Router();

quizRouter.route("/create").get(createQuiz);
quizRouter.route("/:quizId").get(getQuiz);
quizRouter.route("/:quizId/submit").post(submitQuiz);
quizRouter.route("/:quizId/result").get(quizResult);

export default quizRouter;
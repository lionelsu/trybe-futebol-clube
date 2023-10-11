import { Router } from 'express';
import teamsRouter from './TeamsRouter';
import usersRouter from './UsersRouter';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', usersRouter);

export default router;

import { Router } from 'express';
import teamsRouter from './TeamsRouter';
import usersRouter from './UsersRouter';
import matchesRouter from './MatchesRouter';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', usersRouter);
router.use('/matches', matchesRouter);

export default router;

import { Router } from 'express';
import teamsRouter from './TeamsRouter';
import usersRouter from './UsersRouter';
import matchesRouter from './MatchesRouter';
import leaderBoardRouter from './LeaderBoardRouter';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', usersRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', leaderBoardRouter);

export default router;

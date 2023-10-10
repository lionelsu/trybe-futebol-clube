import { Router } from 'express';
import teamsRouter from './TeamsRouter';

const router = Router();

router.use('/teams', teamsRouter);

export default router;

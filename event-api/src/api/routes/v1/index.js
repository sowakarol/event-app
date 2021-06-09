import { Router } from 'express';
import eventRoutes from './event.route';

const router = Router();

router.get('/api/_healthcheck', (_, res) => res.send('OK'));

router.use('/api/v1/events', eventRoutes);

export default router;

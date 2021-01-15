import express from 'express';
import { reviewContoller } from '../controller';

const router = express.Router();

router.post('/add', reviewContoller.add);
router.delete('/remove', reviewContoller.remove);
router.get('/list', reviewContoller.list);

export default router;

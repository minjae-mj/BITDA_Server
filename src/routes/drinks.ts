import express from 'express';
import { drinkController } from '../controller';

const router = express.Router();

router.get('/list', drinkController.list);
router.get('/detail', drinkController.detail);
router.post('/list/type', drinkController.typeList);
router.post('/like', drinkController.like);
router.post('/unlike', drinkController.unlike);
router.post('/add', drinkController.add);

export default router;

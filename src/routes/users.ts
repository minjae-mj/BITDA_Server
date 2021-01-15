import express from 'express';
import { userController } from '../controller';

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.post('/signout', userController.signout);
router.post('/kakao', userController.kakao);
router.post('/google', userController.google);
router.get('/mypage', userController.mypage);
router.get('/bookmark', userController.bookmark);
router.patch('/modifyuser', userController.modifyuser);
router.post('/modifypassword', userController.modifypassword);

export default router;

import express from 'express';
import { userController } from '../controller';
import checkToken from '../utils/sign/checkToken';
const router = express.Router();

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.post('/signout', checkToken, userController.signout);
router.post('/kakao', userController.kakao);
router.post('/google', userController.google);
router.get('/mypage', checkToken, userController.mypage);
router.get('/bookmark', userController.bookmark);
router.patch('/modifyuser', userController.modifyuser);
router.post('/modifypassword', userController.modifypassword);

export default router;

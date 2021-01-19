import express from 'express';
import { userController } from '../controller';
import checkToken from '../utils/sign/checkToken';
import uploadImage from '../utils/upload/uploadProfile';
const router = express.Router();

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.post('/signout', checkToken, userController.signout);
router.post('/kakao', userController.kakao);
router.post('/google', userController.google);
router.get('/mypage', checkToken, userController.mypage);
router.patch(
  '/modifyuser',
  checkToken,
  uploadImage.single('img'),
  userController.modifyuser
);
router.get('/bookmark', checkToken, userController.bookmark);
router.post('/modifypassword', checkToken, userController.modifypassword);

export default router;

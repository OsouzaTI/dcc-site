import express from 'express';

import * as UserController from '../controller/UserController';
import * as MenuController from '../controller/MenuController'
import * as SubMenuController from '../controller/SubMenuController'
import * as PageController from '../controller/PageController'
import * as NewsController from '../controller/NewsController'

import UserModelSync from '../middleware/UserModelSync';
import { middlewares, login } from '../controller/authenticateController';
import MenuModelSync from '../middleware/MenuModelSync';
import SubMenuModelSync from '../middleware/SubMenuModelSync';
import PageModelSync from '../middleware/PageModelSync';
import NewsModelSync from '../middleware/NewsModelSync';

const router = express.Router();

router.post('/auth/login', UserModelSync, login);
// usuarios
router.post('/user/add',  UserModelSync, UserController.add);
router.put('/user/edit', middlewares.authenticate, UserModelSync, UserController.edit);
router.get('/user/all',   UserModelSync, UserController.all);

// menu
router.post('/menu/add', middlewares.authenticate, MenuModelSync, SubMenuModelSync, MenuController.add);
router.put('/menu/edit', middlewares.authenticate, MenuModelSync, SubMenuModelSync, MenuController.edit);
router.delete('/menu/del/:id', middlewares.authenticate, MenuModelSync, SubMenuModelSync, MenuController.del);
router.get('/menu/all',   MenuModelSync, SubMenuModelSync, MenuController.all);

// submenu
router.post('/submenu/add', middlewares.authenticate, SubMenuModelSync, PageModelSync, SubMenuController.add);
router.put('/submenu/edit', middlewares.authenticate, SubMenuModelSync, PageModelSync,SubMenuController.edit);
router.delete('/submenu/del/:id', middlewares.authenticate, SubMenuModelSync, PageModelSync, SubMenuController.del);
router.get('/submenu/all',   SubMenuModelSync, PageModelSync, SubMenuController.all);

// paginas
router.post('/page/add', middlewares.authenticate, PageModelSync, PageController.add);
router.put('/page/edit', middlewares.authenticate, PageModelSync, PageController.edit);
router.delete('/page/del/:id', middlewares.authenticate, PageModelSync, PageController.del);
router.get('/page/all',   PageModelSync, PageController.all);
router.get('/page/all/:slug',   PageModelSync, PageController.allBySubMenuSlug);

// news
router.post('/news/add', middlewares.authenticate, NewsModelSync, NewsController.add);
router.put('/news/edit', middlewares.authenticate, NewsModelSync, NewsController.edit);
router.delete('/news/del/:id', middlewares.authenticate, NewsModelSync, NewsController.del);
router.get('/news/all',   NewsModelSync, NewsController.all);
router.get('/news/:slug',   NewsModelSync, NewsController.newsBySlug);

export default router;
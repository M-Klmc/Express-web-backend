import cors from 'cors';

import { Router, urlencoded, static as staticMiddleware } from 'express';

import { mainPage, detailPage, add, setDone, remove, addendumWrapper, mostActiveUsersPage } from './controllers/todos.js';
import { handleErrors, isGuest, isLoggedIn, loadCurrentUser } from './middleware.js';
import { todoV, registerV, loginV } from './validators.js';
import { mainErrorHandler, error500Handler } from './error-handlers.js';
import { register as registerHandler, login, logout,  } from './controllers/users.js';



const router = Router();
router.use('/storage/uploaded', staticMiddleware('/storage/uploaded'))

// router.use(urlencoded({ extended: true }));

router.use(loadCurrentUser);

router.post('/register', registerV, handleErrors, registerHandler);
router.post('/login', loginV, handleErrors, login);
router.get('/mostactive', mostActiveUsersPage);

router.use(isLoggedIn);

router.post('/logout', logout);

router.post('/', addendumWrapper, todoV, handleErrors, add);
router.get('/', mainPage);
router.get('/:id', detailPage);
router.put('/:id', setDone);
router.delete('/:id', remove);


router.use(mainErrorHandler, error500Handler);

export default router;

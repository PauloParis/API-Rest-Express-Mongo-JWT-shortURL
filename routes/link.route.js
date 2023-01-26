import { Router } from 'express'
import { createLinks, getLink, getLinks, removeLink, updateLink } from '../controllers/link.controller.js';
import { requireToken } from '../middlewares/requireToken.js';
import { bodyLinkValidator, paramsLinkValidator } from '../middlewares/validatorManager.js';

const router = Router();

router.get('/', requireToken, getLinks)         // all link
router.get('/:nanoLink', getLink)         // single link
router.post('/', requireToken, bodyLinkValidator, createLinks )        // create link
// patch -> modifica no todo el objeto
// put   -> modifica todo
router.patch('/:id', requireToken, paramsLinkValidator, bodyLinkValidator, updateLink)         // update link
router.delete('/:id', requireToken, paramsLinkValidator, removeLink)      // delete link 

export default router;
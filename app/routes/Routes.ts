import { Router } from 'express';
import v from '../lib/Validator';
import Lessons from '../controllers/Lessons';

const router = Router();

router.route('/lessons')
  .get(v.lessonsGetMany, Lessons.getMany);

export default router;

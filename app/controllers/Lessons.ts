import { Request, Response } from 'express';
import Lesson from '../models/Lesson';
import Helper from '../lib/Helper';
import APICode from '../lib/APICode';

export default class Lessons {
  public static async getMany(req: Request, res: Response) {
    const { ids } = req.query;
    const groupIds = req.query.group_ids;
    const typeIds = req.query.type_ids;
    const { weeks } = req.query;
    const { days } = req.query;
    const teacherIds: string = req.query.teacher_ids;
    const scienceIds: string = req.query.science_ids;

    try {
      const lessons: Lesson[] = await Lesson.getMany(
        ids, groupIds, typeIds, weeks, days, teacherIds, scienceIds,
      );
      res.send({ lessons });
    } catch (e) {
      Helper.sendError(res, new APICode(0));
    }
  }
}

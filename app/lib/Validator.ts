import { query } from 'express-validator';

const validators = {
  lessonsGetMany: [
    query('weeks')
      .optional()
      .not().isEmpty(),

    query('days')
      .optional()
      .not().isEmpty(),

    query('ids')
      .optional()
      .not().isEmpty(),

    query('group_ids')
      .optional()
      .not().isEmpty(),

    query('type_ids')
      .optional()
      .not().isEmpty(),

    query('teacher_ids')
      .optional()
      .not().isEmpty(),

    query('science_ids')
      .optional()
      .not().isEmpty(),
  ],
};

export default validators;

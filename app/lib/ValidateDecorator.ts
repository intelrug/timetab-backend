import { validationResult } from 'express-validator';
import Helper from './Helper';
import APICode from './APICode';

export default function validate(
  target: any,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<any>,
) {
  const originalMethod = descriptor.value;

  // eslint-disable-next-line no-param-reassign
  descriptor.value = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return Helper.sendError(res, new APICode(3), {
        errors: errors.array({
          onlyFirstError: true,
        }),
      });
    }
    return originalMethod(req, res, next);
  };

  return descriptor;
}

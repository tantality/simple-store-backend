import { Transform } from 'class-transformer';

export function ParseToBoolean(): PropertyDecorator {
  return Transform(({ obj, key }) => {
    return obj[key] === 'true' ? true : obj[key] === 'false' ? false : obj[key];
  });
}

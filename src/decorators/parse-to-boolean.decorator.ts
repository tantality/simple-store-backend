import { Transform } from 'class-transformer';

enum BooleanValue {
  True = 'true',
  False = 'false',
}

export function ParseToBoolean(): PropertyDecorator {
  return Transform(({ obj, key }) => {
    const objKey = obj[key];

    switch (objKey) {
      case BooleanValue.True:
        return true;
      case BooleanValue.False:
        return false;
      default:
        return objKey;
    }
  });
}

import { it } from 'vitest';
import type { TestFunction } from 'vitest';
import type { FindAllByText } from '@vue/test-utils';

it('should do stuff', () => {
  console.log('it did stuff');
});

export type Driver = {
  findAllByText: FindAllByText
};

export function it(name: string, fn?: TestFunction) {
  return
}

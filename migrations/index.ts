import * as migration_20260320_174500_add_event_categories from './20260320_174500_add_event_categories';

export const migrations = [
  {
    up: migration_20260320_174500_add_event_categories.up,
    down: migration_20260320_174500_add_event_categories.down,
    name: '20260320_174500_add_event_categories',
  },
];
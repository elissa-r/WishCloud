import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
setupZoneTestEnv();

if (!(globalThis as any).fetch) {
  (globalThis as any).fetch = jest.fn();
}
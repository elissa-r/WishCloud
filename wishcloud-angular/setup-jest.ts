import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
setupZoneTestEnv();

if (!(globalThis as any).fetch) {
  (globalThis as any).fetch = jest.fn();
}

if (!(globalThis as any).Response) {
  (globalThis as any).Response = class {
    constructor(..._args: any[]) {}
  } as any;
}
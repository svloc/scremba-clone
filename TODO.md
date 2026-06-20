# Migration TODO: Angular 11 -> Angular 12.2.x

- [ ] Update `package.json` versions to Angular 12.2.x compatible set (core, cli, devkit/build, compiler-cli, TS, RxJS, zone.js, @types/node)
- [ ] Clean reinstall: remove `node_modules` and `package-lock.json`, run `npm install`
- [ ] Run `npx ng update @angular/core@12 @angular/cli@12`
- [ ] Run `npm run build`
- [ ] Run `npm test`
- [ ] If build/test fail: fix reported compilation/template errors and/or adjust remaining tooling deps (tslint/protractor/karma/ts-node) as needed


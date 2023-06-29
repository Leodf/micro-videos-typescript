#!bin/sh

npm run cti create './src/@seedwork/application' -- -i '*spec.ts' '*test.ts' -b &&
npm run cti create './src/@seedwork/domain' -- -i '*spec.ts' '*test.ts' -b &&
npm run cti create './src/@seedwork/infra' -- -i '*spec.ts' '*test.ts' -b &&

npm run cti create './src/category/application' -- -i '*spec.ts' '*test.ts' -b &&
npm run cti create './src/category/domain' -- -i '*spec.ts' '*test.ts' -b &&
npm run cti create './src/category/infra' -- -i '*spec.ts' '*test.ts' -b 
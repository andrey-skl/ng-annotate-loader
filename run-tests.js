'use strict';

const test = require('tape');
const webpack = require('webpack');
const fs = require('fs');
const crlf = require('crlf-helper');

test.createStream()
    .pipe(require('tap-spec')())
    .pipe(process.stdout);

const cases = ['typescript', 'babel', 'simple', 'uglifyjs'];

for (let testCase of cases) {
    test('Acceptance tests. Case ' + testCase, (t) => {
        const folder = './cases/' + testCase;

        webpack(require(folder + '/webpack.config.js'), (err, stats) => {
            if (err) {
                throw err; // hard error
            }

            if (stats.hasErrors()) {
              console.error(stats.toString({
                version: false,
                hash: false,
                assets: true,
                chunks: false,
                colors: true,
              }));
            }

            const actualSource = fs.readFileSync(folder + '/dist/build.js', 'utf8');
            const expectedSource = fs.readFileSync(folder + '/reference/build.js', 'utf8');

            t.equal(crlf.setLineEnding(actualSource, 'LF'), crlf.setLineEnding(expectedSource, 'LF'), 'Test annotated source passed');

            const actualMap = prepareMap(fs.readFileSync(folder + '/dist/build.js.map', 'utf8'));
            const expectedMap = prepareMap(fs.readFileSync(folder + '/reference/build.js.map', 'utf8'));

            t.equal(actualMap, expectedMap, 'Test sourcemap  passed');
        });

        t.plan(2);
    });
}

function prepareMap(content){
  return crlf.setLineEnding(content, 'LF').replace(/webpack\/bootstrap [\d\w]+/g, 'webpack/bootstrap [hash]'); // remove hash from map
}

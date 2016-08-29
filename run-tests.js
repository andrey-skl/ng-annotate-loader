'use strict';

const test = require('tape');
const webpack = require('webpack');
const fs = require('fs');
const crlf = require('crlf-helper');


if (process.env.NODE_ENV !== 'test') {
    const tapSpec = require('tap-spec');
    test.createStream()
        .pipe(tapSpec())
        .pipe(process.stdout);
}

const cases = [/*'babel', 'simple',*/ 'typescript'];

for (let testCase of cases) {
    test('Acceptance tests. Case ' + testCase, (t) => {
        const folder = './cases/' + testCase;

        webpack(require(folder + '/webpack.config.js'), (err, stats) => {
            if (err) {
                throw err; // hard error
            }

            //console[stats.hasErrors() ? 'error' : 'info'](stats.toString({
            //    version: false,
            //    hash: false,
            //    assets: true,
            //    chunks: false,
            //    colors: true,
            //}))

            const actualSource = fs.readFileSync(folder + '/dist/build.js', 'utf8');
            const expectedSource = fs.readFileSync(folder + '/reference/build.js', 'utf8');

            t.equal(crlf.setLineEnding(actualSource, 'LF'), crlf.setLineEnding(expectedSource, 'LF'), 'Annotated source is valid');

            const actualMap = fs.readFileSync(folder + '/dist/build.js.map', 'utf8');
            const expectedMap = fs.readFileSync(folder + '/reference/build.js.map', 'utf8');

            t.equal(crlf.setLineEnding(actualMap, 'LF'), crlf.setLineEnding(expectedMap, 'LF'), 'Map is valid')
        });

        t.plan(2);
    });
}

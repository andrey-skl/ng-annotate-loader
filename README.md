# ng-annotate-loader [![Build Status](https://img.shields.io/travis/huston007/ng-annotate-loader.svg?style=flat-square)](https://travis-ci.org/huston007/ng-annotate-loader)
Webpack loader to annotate angular applications. Generates a sourcemaps as well.

Usage:

```
module: {
    loaders: [
      {test: /src.*\.js$/, loaders: ['ng-annotate']},
    ]
  }
```

Works great with js compilers, `babel` for example:

```
    {test: /src.*\.js$/, loaders: ['ng-annotate', 'babel-loader']},
```

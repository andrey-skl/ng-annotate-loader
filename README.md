# ng-annotate-loader
Webpack loader to annotate angular applications.

Usage:

```
module: {
    loaders: [
      {test: /src.*\.js$/, loaders: ['ng-annotate']},
    ]
  }
```
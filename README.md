# ng-annotate-loader
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

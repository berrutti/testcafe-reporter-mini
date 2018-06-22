# testcafe-reporter-mini
[![Build Status](https://travis-ci.org/berrutti/testcafe-reporter-mini.svg)](https://travis-ci.org/berrutti/testcafe-reporter-mini)

This is the **mini** reporter plugin for [TestCafe](http://devexpress.github.io/testcafe).

<p align="center">
    <img src="https://raw.github.com/berrutti/testcafe-reporter-mini/master/media/preview.png" alt="preview" />
</p>

## Install

```
npm install testcafe-reporter-mini
```

## Usage

When you run tests from the command line, specify the reporter name by using the `--reporter` option:

```
testcafe chrome 'path/to/test/file.js' --reporter mini
```


When you use API, pass the reporter name to the `reporter()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('chrome')
    .reporter('mini') // <-
    .run();
```

## Author
Matias Berrutti (http://berrutti.me)

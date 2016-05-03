/* eslint no-console: 0 */

const path = require('path');
const http = require("http");
const express = require('express');
const elementtree = require('elementtree');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

const httpGet = (url, callback) => {
  http
    .get(url, function (res) {
      var body = '';
      res.on('data', function (data) {
        body += data;
      });
      res.on('end', function () {
        callback(null, body);
      });
    })
    .on('error', function (error) {
      callback(error);
    });
}

const parseXml = (xml) => {
  const result = elementtree.parse(xml);
  const updated = result.findtext('./updated');
  const entries = result
    .findall('./entry')
    .map((node) => ({
      id: node.findtext('./id'),
      title: node.findtext('./title'),
      link: node.find('./link').get('href'),
      summary: node.findtext('./summary')
    }));

  return {
    updated,
    entries
  };
};

app.get('/rss', (req, res) => {
  const url = 'http://rssdiy.com/u/2/cnbeta.xml';
  httpGet(url, function (error, body) {
    if (error) {
      res.json({ error });
      return;
    }

    const data = parseXml(body);
    res.json({ data });
  });
});

if (isDeveloping) {
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('./webpack.config.js');
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(__dirname + '/dist'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});


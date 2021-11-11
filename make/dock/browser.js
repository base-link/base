
const webpack = require('webpack')
const pathResolver = require('path')
const make = require('..')

const ROAD_TO_MINT = {
  '@drumwork/base/test/dock/browser': 'test-file',
  '@drumwork/base/test/view/example': 'view-file',
  '@drumwork/base/test/task': 'task-file',
  '@drumwork/base/test/task/view': 'task-file',
  '@drumwork/dock/code/javascript/error': 'dock-task-file',
  '@drumwork/dock/code/javascript/string': 'dock-task-file',
  '@drumwork/dock/code/javascript/base': 'dock-task-file',
  '@drumwork/dock/code/javascript/console': 'dock-task-file',
  '@drumwork/dock/code/javascript/number': 'dock-task-file',
  '@drumwork/dock/code/javascript/object': 'dock-task-file',
  '@drumwork/dock/code/javascript/promise': 'dock-task-file',
  '@drumwork/dock/code/javascript/module': 'dock-task-file',
  '@drumwork/base/code/host/form/bind': 'form-file',
  '@drumwork/base/code/host/form/term': 'form-file',
  '@drumwork/base/code/host/form/sift': 'form-file',
  '@drumwork/base/code/host/form/call': 'form-file',
  '@drumwork/base/code/host/form/task': 'form-file',
  '@drumwork/base/code/host/form/link': 'form-file',
  '@drumwork/base/code/dock/browser': 'dock-task-file',
}

async function compile() {
  webpack({
    mode: 'development',
    entry: './load/browser/base.js',
    output: {
      filename: './load/browser/bundle.js',
      path: pathResolver.resolve(pathResolver.join(__dirname, '../..'))
    }
  }, (err, stats) => {
    if (err || stats.hasErrors()) {
      console.log(err);
    }
  });
}

make(`@drumwork/base/test/dock/browser`, ROAD_TO_MINT, `browser`, compile)

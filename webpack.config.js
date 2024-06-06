import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Needed for resolving __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  entry: './dist/index.js',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      "http": "stream-http",
      "https": "https-browserify",
      "url": "url",
      "buffer": "buffer",
      "stream": "stream-browserify",
      "assert": "assert",
      "crypto": "crypto-browserify"
    },
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist/minified'),
    libraryTarget: 'module'
  },
  experiments: {
    outputModule: true,
  },
  optimization: {
    minimize: true,
  },
  mode: 'production' // Setting mode to production to avoid warnings
};

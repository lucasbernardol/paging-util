<div align="center">
  <h2 align="center">Paging-util, generic algorithm</h2>

  <p align="center">
    A simple and generic paging algorithm for
    Node.js JavaScript and TypeScript, free dependencies
  </p>
</div>

<div align="center">
  <img alt="GitHub" src="https://img.shields.io/github/license/lucasbernardol/paging-util" />
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/lucasbernardol/paging-util" />
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/lucasbernardol/paging-util" />
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/lucasbernardol/paging-util" />
  <a href="www.github.com/lucasbernardol">
    <img src="https://img.shields.io/badge/author-Jos%C3%A9%20Lucas-brightgreen" />
  </a>
</div>

---

## :arrow_down: Install guide

- install via **yarn** package manager:

```bash
$ yarn add paging-util
```

- install via **npm** package manager:

```bash
$ npm install paging-util
```

## :file_folder: Basic Usage

Using (import/export) ESM

```javascript
import { paginate } from 'paging-util';
import * as Pageneric from 'paging-util';

const { offSet } = paginate({ total: 100, page: 2 });

console.log(offSet);
```

Using (require/node) CommonJS

```javascript
const { paginate } = require('paging-util');

const { offSet } = paginate({ total: 100 });

console.log(offSet);
```

## Support project

- Give me a :star: if project help you.
- Contribuitions, issues and pull requests and more.

Build with ❤️ by: [José Lucas](https://github.com/lucasbernardol)

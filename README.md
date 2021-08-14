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

- Using (import/export) **ESM**

```javascript
import { paginate, calculateRange } from 'paging-util';

const { offSet } = paginate({ total: 100 });
console.log(offSet); // output: 0

const range = calculateRange(1, 10);
console.log(range); // output: [1, 2, 3, 4, ...]
```

- Using (require/node) **CommonJS**

```javascript
const { paginate, calculateRange } = require('paging-util');
```

## API

- **paginate({ total: 100, ...options }):** Calculate pagination.

| Property name | required | default | description                  |
| ------------- | -------- | ------- | ---------------------------- |
| total         | true     | null    | total items                  |
| page          | false    | 1       | current page                 |
| limit         | false    | 10      | total items to show per page |
| min           | false    | 10      | min items per page           |
| max           | false    | 30      | max items per page           |
| setRange      | false    | false   | calculate range              |

#### Output:

- **total** - total items
- **pages** - total pages
- **current** - current page
- **limit** - total items per page
- **next** - next page or `null`
- **previous** - previous page or `null`
- **hasNextPage** - `true` or `false`
- **hasPreviousPage** - `true` or `false`
- **offSet** - pagination offset,
- **firstIndex**, **lastIndex** - first and last pagination index,
- **range** - array of pages or `null`

---

- **calculateRange(start, end):** Calculate range.

## Support project

- Give me a :star: if project help you.
- Contribuitions, issues and pull requests and more.

Build with ❤️ by: [José Lucas](https://github.com/lucasbernardol)

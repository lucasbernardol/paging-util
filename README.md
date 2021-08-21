## paging-util, generic algorithm

> A simple and generic paging algorithm for
> Node.js JavaScript and TypeScript, free dependencies

<div>
  <img alt="GitHub" src="https://img.shields.io/github/license/lucasbernardol/paging-util" />
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/lucasbernardol/paging-util" />
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/lucasbernardol/paging-util" />
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/lucasbernardol/paging-util" />
  <a href="www.github.com/lucasbernardol">
    <img src="https://img.shields.io/badge/author-Jos%C3%A9%20Lucas-brightgreen" />
  </a>

  <img alt="npm" src="https://img.shields.io/npm/dm/paging-util">
</div>

---

## Install

```bash
$ yarn add paging-util
```

## :file_folder: Basic Usage

- Using (import/export) **ESM**

```javascript
import { paginate, range } from 'paging-util';

const { offSet } = paginate({ total: 100 });
console.log(offSet);

const pages = range(1, 10);
console.log(pages);
```

- Using (require/node) **CommonJS**

```javascript
const { paginate } = require('paging-util');

const { range } = paginate({
  total: 100,
  setRange: true,
});

const odds = range.filter(value => !(value % 2));
```

## API

- **paginate({ total: 100, ...options }):** pagination, main method.

#### Options

| Prop name | required | default | description                        |
| --------- | -------- | ------- | ---------------------------------- |
| total     | true     | -       | total (resources)                  |
| page      | false    | 1       | current page                       |
| limit     | false    | 10      | total (resources) to show per page |
| setRange  | false    | false   | calculate range                    |

#### Output:

- **pagination** - pagination `object`
  - **total** - total items
  - **pages** - total pages
  - **currentPage** - current page
  - **firstPage** - first page `1`
  - **limit** - total items to show per page, `10`
  - **firstResult, lastResult** - first and last result (indexes)
  - **results** - results to show
  - **next** - next page
  - **previous** - previous page,
  - **hasNextPage** - `true` or `false`
  - **hasPreviousPage** - `true` or `false`
- **offSet** - pagination Offset-based
- **range** - array of pages

---

- **range(start?, end?):** array of pages.

## Support project

- Give me a :star: if project help you.
- Contribuitions, issues and pull requests and more.

Build with ❤️ by: [José Lucas](https://github.com/lucasbernardol)

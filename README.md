<h2>📘 paging-util, generic algorithm</h2>

<p>
  <a href="https://github.com/lucasbernardol/paging-util#readme" target="_blank">
    <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/lucasbernardol/paging-util" />
  </a>
  <a href="https://www.npmjs.com/package/paging-util" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/paging-util.svg">
  </a>
  <a href="https://github.com/lucasbernardol/paging-util#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/lucasbernardol/paging-util/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/lucasbernardol/paging-util/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/lucasbernardol/paging-util" />
  </a>
  <a href="https://github.com/lucasbernardol/paging-util#readme" target="_blank">
    <img alt="npm" src="https://img.shields.io/npm/dm/paging-util">
  </a>
</p>

> A simple and generic paging algorithm for
> Node.js JavaScript and TypeScript, free dependencies

### 🏠 [Homepage](https://github.com/lucasbernardol/paging-util#readme)

## Install

```bash
$ yarn add paging-util
```

## :file_folder: Basic Usage

- Using (import/export) **ESM**

```javascript
import { paginate } from 'paging-util';

const { offSet, pagination } = paginate({ total: 100 });

console.log({ offSet, pagination });
```

- Using (require/node) **CommonJS**

```javascript
const { paginate } = require('paging-util');

const { range } = paginate({ total: 100, setRange: true });

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

## Author

👤 **José Lucas**

- Github: [@lucasbernardol](https://github.com/lucasbernardol)

## :open_hands: Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/lucasbernardol/paging-util/issues).

## Support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2021 [José Lucas](https://github.com/lucasbernardol).
<br />
This project is [MIT](https://github.com/lucasbernardol/paging-util/blob/master/LICENSE) licensed.

Build with ❤️ by: [José Lucas](https://github.com/lucasbernardol)

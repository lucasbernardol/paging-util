## 📘 paging-util ![GitHub top language](https://img.shields.io/github/languages/top/lucasbernardol/paging-util) ![Version](https://img.shields.io/npm/v/paging-util.svg) ![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg) ![License: MIT](https://img.shields.io/github/license/lucasbernardol/paging-util) ![Downloads](https://img.shields.io/npm/dm/paging-util)

> A simple and generic paging algorithm for
> Node.js JavaScript and TypeScript, free dependencies

#### 🏠 [Homepage](https://github.com/lucasbernardol/paging-util#readme)

## Install

Install with [yarn](https://yarnpkg.com):

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
  - **current** - current page
  - **firstPage** - first page `1`
  - **limit** - total items to show per page, `10`
  - **firstIndex, lastIndex** - first and last result (indexes)
  - **length** - results to show
  - **next** - next page
  - **previous** - previous page,
  - **hasNext** - `true` or `false`
  - **hasPrevious** - `true` or `false`
- **offSet** - pagination Offset-based
- **range** - array of pages

---

- **range(start, end?, step?):** array of pages.

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

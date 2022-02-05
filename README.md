<h2 align="center">
  📘 Paging-util: a simple paging algorithm!
</h2>

<div align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/lucasbernardol/paging-util">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/lucasbernardol/paging-util">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/lucasbernardol/paging-util">
  <img alt="GitHub" src="https://img.shields.io/github/license/lucasbernardol/paging-util">
  <img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/lucasbernardol/paging-util">
  <img alt="npm" src="https://img.shields.io/npm/dm/paging-util">
</div>

<p align="center">
  A simple and generic paging algorithm for Node.js,JavaScript and TypeScript. Free dependencies. <br/>
  Support: give a ⭐ if this project helped you! Gihub: <a href="https://github.com/lucasbernardol/paging-util">José Lucas</a>
</p>
    
## :arrow_down: Install package

Install with [yarn](https://yarnpkg.com):

```bash
$ yarn add paging-util
```

## :file_folder: Basic Usage

- Using (import/export) **ESM**

```javascript
import { paginate } from 'paging-util';
import { Publication } from '../models/Publication'; // mongoose schema/model!

export class UsersController {
  constructor() {}
  async find(request, response) {
    try {
      const { page, limit } = request.query;

      const records = await Publication.find().countDocuments(); // records: 100

      const { offset, limit, ...paging } = paginate({ records, page, limit });

      const publications = await Publication.find().skip(offset).limit(limit);

      /**
       * - Offset-based pagination.
       *  ((1 - 1) * 10) = 0 * 10 => 0  =>  Position 1: 0 - 9
       *  ((2 - 1) * 10) = 1 * 10 => 10 =>  Position 2: 10 - 19
       */

      return response.json({ publications, metadata: { limit, ...rest } });
    } catch (error) {
      console.log(error);

      return response.end();
    }
  }
}
```

- Using (require/node) **CommonJS**

```javascript
const { paginate } = require('paging-util');

const { range } = paginate({ records: 100, setRange: true });

const odds = range.filter(value => !(value % 2));

console.log(odds); // output: [2, 4, 6, 8, 10]
```

## :wrench: API

- **paginate({ records: 100, ...options }):**

#### Options

| Property name | Required | Default | Description                        |
| ------------- | -------- | ------- | ---------------------------------- |
| records       | true     | -       | Resources/records                  |
| page          | false    | 1       | Current page                       |
| limit         | false    | 10      | Total (resources) to show per page |
| setRange      | false    | false   | Set array of pages                 |
| min           | false    | 10      | Min limit                          |
| max           | false    | 20      | Max limit                          |

#### Output:

- **Object**:
  - **records** - Total records/resources to paging.
  - **totalPages** - Total pages
  - **currentPage** - Current page, default: `1`
  - **firstPage** - First page, default: `1`
  - **limit** - Total items to show per page, default: `10`
  - **next** - Next page
  - **previous** - Previous page,
  - **hasNext** - `true` or `false`
  - **hasPrevious** - `true` or `false`
  - **firstIndex, lastIndex** - First and last result (index).
  - **length** - Results length.
  - **offSet** - Offset-based pagination.
  - **constants** - Fixed values.
  - **range** - Array of pages, default: `null`

---

- **range(start, end?, step?):** Array of pages.

## :open_hands: Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/lucasbernardol/paging-util/issues).

## 📝 License

Copyright © 2021 [José Lucas](https://github.com/lucasbernardol).
<br />
This project is [MIT](https://github.com/lucasbernardol/paging-util/blob/master/LICENSE) licensed.

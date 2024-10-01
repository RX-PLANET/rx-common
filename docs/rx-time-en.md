## Introduction

`RxTime` is a time handling class based on `dayjs`, supporting timezone conversion and time formatting. It helps you convert time between different time zones and output time in a specified format.

## Usage

### Import

Import the `RxTime` class in your JavaScript file:

```javascript
import RxTime from '@iruxu/pkg-common/utils/rx-time.js';
```

### Initialization

You can pass the user's timezone when instantiating the `RxTime` class. If not provided, the system's timezone will be used by default:

```javascript
const rxTime = new RxTime('America/New_York');
```

### Methods

#### `convert(date)`

Convert the specified date from the storage timezone (default is `Asia/Shanghai`) to the user's timezone.

**Parameters:**

- `date` (String | Date): The date to be converted.

**Returns:**

- The converted date object.

**Example:**

```javascript
const convertedDate = rxTime.convert('2023-10-01T12:00:00Z');
console.log(convertedDate.toString());
```

#### `format(date, formatString)`

Format the specified date into the specified format.

**Parameters:**

- `date` (String | Date): The date to be formatted.
- `formatString` (String): The format string supported by `dayjs`.

**Returns:**

- The formatted date string.

**Example:**

```javascript
const formattedDate = rxTime.format('2023-10-01T12:00:00Z', 'YYYY-MM-DD HH:mm:ss');
console.log(formattedDate); // Outputs the formatted date string
```
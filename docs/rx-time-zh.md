# RxTime 使用文档

## 简介

`RxTime` 是一个基于 `dayjs` 的时间处理类，支持时区转换和时间格式化。它可以帮助你在不同的时区之间进行时间转换，并以指定的格式输出时间。

## 使用方法

### 导入

在你的 JavaScript 文件中导入 `RxTime` 类：

```javascript
import RxTime from '@iruxu/pkg-common/utils/rx-time.js';
```

### 初始化

你可以在实例化 `RxTime` 类时传入用户的时区。如果不传入，默认会使用系统的时区：

```javascript
const rxTime = new RxTime('America/New_York');
```

### 方法

#### `convert(date)`

将指定日期从存储时区（默认为 `Asia/Shanghai`）转换为用户时区。

**参数:**

- `date` (String | Date): 要转换的日期。

**返回值:**

- 转换后的日期对象。

**示例:**

```javascript
const convertedDate = rxTime.convert('2023-10-01T12:00:00Z');
console.log(convertedDate.toString());
```

#### `format(date, formatString)`

将指定日期格式化为指定格式。

**参数:**

- `date` (String | Date): 要格式化的日期。
- `formatString` (String): `dayjs` 支持的格式字符串。

**返回值:**

- 格式化后的日期字符串。

**示例:**

```javascript
const formattedDate = rxTime.format('2023-10-01T12:00:00Z', 'YYYY-MM-DD HH:mm:ss');
console.log(formattedDate); // 输出格式化后的日期字符串
```

# eslint-config-expo

## Install

1. Install Eslint on your projet

```shell
yarn add --dev eslint @eslint/js
```

2. Install config

```shell
yarn add --dev @nodstudio/eslint-config-expo
```

3. Add config to yours

```js
import nodStudioConfigExpo from "@nodstudio/eslint-config-expo";

export default [
    // ...
    ...nodStudioConfigExpo
];
```

## Usage

### Imports

The goal is to force a file structure logic where low-levels components can't import high-levels components.

| folder | can't import from |
|:---:|:---:|
| @design/\*\*/\*<br>@/design/\*\*/\*<br>design/\*\*/\*<br>src/design/\*\*/\* | @containers/\*\*/\*<br>@/containers/\*\*/\*<br>containers/\*\*/\*<br>src/containers/\*\*/\*<br><br>@components/\*\*/\*<br>@/components/\*\*/\*<br>components/\*\*/\*<br>src/components/\*\*/\* |
| @components/\*\*/\*<br>@/components/\*\*/\*<br>components/\*\*/\*<br>src/components/\*\*/\* | @containers/\*\*/\*<br>@/containers/\*\*/\*<br>containers/\*\*/\*<br>src/containers/\*\*/\* |

### Examples

With new expo file structure :
.  
├── app  
├── assets  
├── components (can't import from ./containers)  
├── containers  
├── db  
├── design (can't import from ./components or ./containers)  
├── doc  
├── enums  
├── game  
├── models  
├── scripts  
└── utils  

With old expo file structure :  
.  
├── assets  
├── doc  
├── scripts  
└── src  
&nbsp;&nbsp;&nbsp;&nbsp;├── app  
&nbsp;&nbsp;&nbsp;&nbsp;├── components (can't import from src/containers)  
&nbsp;&nbsp;&nbsp;&nbsp;├── containers  
&nbsp;&nbsp;&nbsp;&nbsp;├── db  
&nbsp;&nbsp;&nbsp;&nbsp;├── design (can't import from src/components or src/containers)  
&nbsp;&nbsp;&nbsp;&nbsp;├── enums  
&nbsp;&nbsp;&nbsp;&nbsp;├── game  
&nbsp;&nbsp;&nbsp;&nbsp;├── models  
&nbsp;&nbsp;&nbsp;&nbsp;└── utils  

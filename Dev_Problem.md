## 问题一 ESM的Node引入

#### 问题描述

bcrypt-ts是es-module，无法require，但是nestjs默认打包方式会使它变成require，从而代码无法正常运行

#### 问题尝试

1. package.json 添加”type“ : module。type默认为commonjs，js文件采用cjs规范，使用module后改为esm规范。但不管如何mjs始终为esm，cjs始终为cjs规范。
   尝试后失败，仍无法导入bcrypt-ts
2. 设置tsconfig , esModuleInterop, allowSyntheticDefaultImports.失败。导致普通ts文件无法被正常导入。

#### 问题解决

抛弃bcrypt-ts，使用bcrypt和@types/bcrypt
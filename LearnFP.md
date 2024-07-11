> [前端工程研究：理解函式編程核心概念與如何進行 JavaScript 函式編程 | The Will Will Web (miniasp.com)](https://blog.miniasp.com/post/2016/12/10/Functional-Programming-in-JavaScript)

## 函数式编程

1. 避免改变状态，引出纯函数性质：相同输入相同输出。OOP典型的类自身属性就是状态。
2. 没有副作用（不改变外界）。
3. 执行过程使用简单函数完成复杂运算。

函数式编程满足有许多条件，例如函数为一等公民（可像正常的值或变量一样操作）

高阶函数：函数作为参数或者函数作为返回值。如map、filter等，其隐藏了遍历顺序。

#### 特点

1. 代码更易读，可维护性增强，毕竟由简单函数构成复杂操作
2. 优于纯函数性质，更容易测试
3. 性能略差，但是前端本身对这方面不是特别敏感

1----COMPLETE THIS EXPRESSION --function vol(p){return p.width * p.height}return movieLists.concatMap(function(movieList)return movieList.videos.map(v =>({id : v.id.title :v.title,boxart:v.boxarts.reduce((p,c)=>vol(p)<= vol(c)?p:c)
}))
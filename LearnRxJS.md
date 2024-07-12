## Reactive Extensions (Rx)

应用在异步数据流上。例如发送5个ajax，相应顺序可能与发送顺序不一致。

###### 事件Event触发回调和遍历数组实质上是一致的 =》 传输数据 + 处理

区别在于前者一般来说不会停止，后者数量有限。

| Observable方法        | 用处                             |
| --------------------- | -------------------------------- |
| take(num)             | 限制接受num次数据                |
| takeUntil(observable) | 直到obs事件触发停止              |
| forEach( callback)    | 调用callback对数据流每个信息处理 |


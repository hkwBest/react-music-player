
//根据主线程发来的数据，Worker线程可以执行特定内容
this.onmessage = function(even) {
  //even.data 来获取主线程传入的参数
  var data = even.data
  switch (data.type) {
    case 'plus':
      this.postMessage(
        `${data.content} + ${data.content} is ${data.content * 2}`
      )
      break
    case 'multiple':
      this.postMessage(
        `${data.content} * ${data.content} is ${data.content * data.content}`
      )
      break
    case 'stop':
      this.postMessage(`${data.content}`)
      /**
       * 可通过调用close方法结束当前Worker线程
       */
      this.close()
      break
    default:
      break
  }
}

/**
 * this 代表Worker线程本身（也可省略不写）
 * 通过onmessage指定监听事件来获取主线程发送的数据
 * 通过postMessage来发送数据到主线程
 */

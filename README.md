# autoApi
基于 express 的标准化、半自动化API模板
## 目的
在实际工作中，我们会接触到非常多的项目，而每个项目的开发人员都有自己的风格和标准，为了使相关人员不在API的规则和实现上浪费时间，特此编写此程序。

### 1.代码相关说明
>[参见我原来的文章 nodejs实现restful API][1]
### 2.数据状态
>关于增删改查，我们将其抽象出来就是数据本身状态的变化，以及和其他数据的关系变化。此程序主要遵从的思想就是将现实业务映射到数据状态上，并且通过动态生成的对象来实现具体操作，在JavaScript这种解释型语言中非常容易实现，在C#/JAVA之类的语言也可以通过反射来实现。
### 3.主要依赖项
>[express][2]、[chokidar][3]、[mongoose][4]
### 4.目前主要的功能
>安装完成后，只需要对models进行操作，即可实现对应的基础API，启动服务后可以使用chokidar.js脚本来自动对service的引用管理，也可以手动引用
### 5.如何使用
> 进入当前目录运行 `npm i` 安装所需依赖包，然后运行 `npm run start` 运行当前程序，默认端口是 `4000` 。我已经添加好了userModel和userService以及引用完成，请求 `localhost:4000/api/user/find` 即可得到响应。

- 必须项
  >确保安装[monogdb][5]并且已启动，确保安装[nodejs][6]

- 可选项
  >推荐使用[vscode][7]、[Robo 3T][8]、[sourcetree][9]

- 手动引用
  >- 在models目录下新建 `yourModel.js`
  >- 在services目录下新建 `yourService.js`，引用 `yourModel`
  >- 在 `services/services.js` 内引用 `youService`

- 自动引用
  >- 运行 `node chokidar.js`
  >- 在models目录下新建'yourModel.js'
  >- `chokidar.js` 会自动监听文件变化来修改service文件
- 使用manage功能
  >- 目前正在开发过程中
### 6.注意事项
>设计schema时，要充分考虑当前的业务和未来的变动，尽量保持数据结构扁平，尽最大可能保持各个schema之间的简单关系。
>`chokidar.js`代码在不同系统中，可能表现各异，具体情况请看注释



  [1]: https://segmentfault.com/a/1190000010433698
  [2]: https://www.npmjs.com/package/express
  [3]: https://www.npmjs.com/package/chokidar
  [4]: http://mongoosejs.com/
  [5]: https://www.mongodb.com/
  [6]: http://nodejs.cn/
  [7]: https://code.visualstudio.com/
  [8]: https://robomongo.org/
  [9]: https://www.sourcetreeapp.com/

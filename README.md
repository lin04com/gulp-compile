README
------

## 安装Gulp组件

安装组件项目目录，通过cd project 进入目录，执行下边的npm安装组件。

> $ npm install gulp gulp-minify-html gulp-ruby-sass gulp-minify-css gulp-autoprefixer gulp-jshint gulp-uglify gulp-imagemin imagemin-pngquant gulp-rename gulp-clean gulp-concat gulp-cache gulp-copy gulp-zip gulp-unzip gulp-replace browser-sync --save-dev

## 项目目录结构

project(项目名称)
|–node_modules 组件目录
|–dist 发布环境
    |–css 样式文件(style.css style.min.css)
    |–images 图片文件(压缩图片)
    |–js js文件(main.js main.min.js)
    |–index.html 静态文件(压缩html)
|–src 生产环境
    |–css css文件
    |–images 图片文件
    |–js js文件
    |–index.html 静态文件
|–.jshintrc jshint配置文件
|–config.json 配置文件
|–package.json 模块信息
|–gulpfile.js gulp任务文件
|–README.md   readme

## gulp基础语法

gulp通过gulpfile文件来完成相关任务，因此项目中必须包含gulpfile.js

gulp有五个方法：src、dest、task、run、watch
src和dest：指定源文件和处理后文件的路径
watch：用来监听文件的变化
task：指定任务
run：执行任务

## 编写gulp任务

[gulpfile](gulpfile.js)


## package.json

{
  "devDependencies": {
    "gulp-rename": "~1.2.2",
    "gulp-replace": "~0.5.3",
    "gulp-copy": "0.0.2",
    "gulp-minify-css": "~1.2.0",
    "gulp-unzip": "~0.1.3",
    "gulp-uglify": "~1.2.0",
    "gulp-jshint": "~1.11.2",
    "gulp-autoprefixer": "~2.3.1",
    "gulp": "~3.9.0",
    "gulp-clean": "~0.3.1",
    "gulp-cache": "0.2.9",
    "gulp-concat": "~2.6.0",
    "gulp-zip": "~3.0.2",
    "gulp-minify-html": "~1.0.3",
    "gulp-ruby-sass": "~1.0.5",
    "browser-sync": "~2.7.13",
    "gulp-imagemin": "~2.3.0",
    "imagemin-pngquant": "~4.1.2"
  }
}

# 模态框拖拽事件快速实现
## Scripts
```javascript
npm i
// 打包ES Module包
npm run build
// 打包UMD包
npm run build-umd
// 打开demo.html快速体验模态框拖动操作
```
## Params
dragModal(element, dragAttrs, options)
> 如果是 UMD 使用 dragModal.default(element, dragAttrs, options)
### element
模态框 Element 对象
### dragAttrs
标识各个拖拽部件组件属性
|属性名|说明|默认值|
|---|---|---|
|move|拖拽移动窗口部件|drag-move|
|resize.left|修改窗口大小左侧部件|drag-resize-left|
|resize.right|修改窗口大小右侧部件|drag-resize-right|
|resize.top|修改窗口大小顶部部件|drag-resize-top|
|resize.bottom|修改窗口大小底部部件|drag-resize-bottom|
### options
其他配置
|属性名|说明|默认值|
|---|---|---|
|minWidth|窗口最小宽度|250|
|minHeight|窗口最小高度|250|
## Demo
```javascript
dragModal(
  document.getElementById("modal"),
  {
    move: "drag-move",
    resize: {
      left: "drag-resize-left",
      right: "drag-resize-right",
      top: "drag-resize-top",
      bottom: "drag-resize-bottom",
    },
    {
      minWidth: 250,
      minHeight: 250,
    }
  }
)
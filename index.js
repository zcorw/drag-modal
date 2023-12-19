import dragInit from './drag';
/**
 * 绑定窗口拖动事件
 * @param {*} element 待设置事件的元素
 * @param {*} dragAttrs 标识拖动组件，move  窗口拖动，resize.left 窗口左边框调整，resize.right 窗口右边框调整，resize.top 窗口上边框调整，resize.bottom 窗口下边框调整
 * @param {*} options 其他配置，minHeight 最小高度，minWidth 最小宽度
 */
function dragModal(element, dragAttrs, options) {
  if (!(element instanceof Element)) {
    throw new Error("第一参数必须是 Element 类型");
  }
  // 窗口大小
  let clientWidth = 0;
  let clientHeight = 0;
  // 窗口位置
  let x = 0;
  let y = 0;
  function start() {
    clientHeight = element.clientHeight;
    clientWidth = element.clientWidth;
    x = element.offsetLeft;
    y = element.offsetTop;
  }
  // 最小宽高
  let minWidth = options?.minWidth || 250;
  let minHeight = options?.minHeight || 250;
  const dragMoveAttr = dragAttrs?.move || 'drag-move';
  const dragResizeLeftAttr = dragAttrs?.resize?.left || 'drag-resize-left';
  const dragResizeRightAttr = dragAttrs?.resize?.right || 'drag-resize-right';
  const dragResizeTopAttr = dragAttrs?.resize?.top || 'drag-resize-top';
  const dragResizeBottomAttr = dragAttrs?.resize?.bottom || 'drag-resize-bottom';
  function handle(ele, { x: xDiff, y: yDiff, mouseX, mouseY }) {
    const borderPoint = {top: y, left: x, right: x + clientWidth, bottom: y + clientHeight};
    if (ele.hasAttribute(dragMoveAttr)) {
      element.style.left = x + xDiff + "px";
      element.style.top = y + yDiff + "px";
      x += xDiff;
      y += yDiff;
    }
    if (ele.hasAttribute(dragResizeBottomAttr)) {
      let height = minHeight;
      if (mouseY - y > minHeight) {
        height = mouseY - y;
      }
      element.style.height = height + "px";
      clientHeight = height;
    }
    if (ele.hasAttribute(dragResizeRightAttr)) {
      let width = minWidth;
      if (mouseX - x > minWidth) {
        width = mouseX - x;
      }
      element.style.width = width + "px";
      clientWidth = width;
    }
    if (ele.hasAttribute(dragResizeTopAttr)) {
      let height = minHeight;
      let bottomY = borderPoint.bottom;
      console.log(bottomY - mouseY, minHeight)
      if (bottomY - mouseY >= minHeight) {
        height = bottomY - mouseY;
      }
      element.style.height = height + "px";
      clientHeight = height;
      element.style.top = bottomY - height + "px";
      y = bottomY - height;
    }
    if (ele.hasAttribute(dragResizeLeftAttr)) {
      let width = minWidth;
      let rightX = borderPoint.right;
      if (rightX - mouseX >= minWidth) {
        width = rightX - mouseX;
      }
      element.style.width = width + "px";
      clientWidth = width;
      element.style.left = rightX - width + "px";
      x = rightX - width;
    }
  }
  const headers = element.querySelectorAll(`[${dragMoveAttr}]`);
  const lefts = element.querySelectorAll(`[${dragResizeLeftAttr}]`);
  const rights = element.querySelectorAll(`[${dragResizeRightAttr}]`);
  const tops = element.querySelectorAll(`[${dragResizeTopAttr}]`);
  const bottoms = element.querySelectorAll(`[${dragResizeBottomAttr}]`);
  let nodeList = [...headers, ...lefts, ...rights, ...tops, ...bottoms];
  nodeList = nodeList.reduce((res, node) => {
    if (res.indexOf(node) === -1) {
      res.push(node);
    }
    return res;
  }, []);
  const events = nodeList.map(node => dragInit(node));
  events.forEach(event => event.addEventListener("start", start));
  events.forEach(event => event.addEventListener("move", (point) => handle(event.element, point)));
}

export default dragModal;
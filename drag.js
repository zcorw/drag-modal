import Events from "./events.js";

export default function dragInit(element) {
  let startX = 0;
  let startY = 0;
  let x = 0;
  let y = 0;
  let browerWidth = 0;
  let browerHeight = 0;
  let clickStart = false;
  let events = new Events();
  events.element = element;

  function mousemove(e) {
    if (!(e.clientX < 0 || e.clientX > browerWidth)) {
      x = e.clientX;
    }
    if (!(e.clientY < 0 || e.clientY > browerHeight)) {
      y = e.clientY;
    }
  }
  element.addEventListener("mousedown", (e) => {
    if (e.target !== element) return;
    const mask = document.createElement("div");
    mask.style.cssText =
      "position: absolute;left: 0;top: 0;width: 100vw;height: 100vh;z-index: 99999;";
    document.body.append(mask);
    browerWidth = window.innerWidth;
    browerHeight = window.innerHeight;
    clickStart = true;
    startX = e.clientX;
    startY = e.clientY;
    x = e.clientX;
    y = e.clientY;
    events.dispatchEvent("start", {x: e.clientX, y: e.clientY});
    mask.addEventListener("mousemove", mousemove);
    function step() {
      window.requestAnimationFrame(() => {
        events.dispatchEvent("move", { x: x - startX, y: y - startY, mouseX: x, mouseY: y });
        (startX = x), (startY = y);
        if (clickStart) {
          step();
        }
      });
    }
    step();
    document.addEventListener(
      "mouseup",
      () => {
        clickStart = false;
        mask.removeEventListener("mousemove", mousemove);
        mask.remove();
      },
      { once: true },
    );
  });
  return events;
}

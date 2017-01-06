// FPS Input Controller
function createInputController(model) {
  function bindViewModelNumber(options) {
    const elem = options.element;
    const model = options.model;
    const key = options.key;
    const parse = options.parse;

    elem.type = "number";
    elem.value = model[key];

    elem.oninput = (event) => {
      let value = parseFloat(event.srcElement.value);
      value = isNaN(value) ? 0 : value;

      model[key] = value;
    }
  }

  bindViewModelNumber({
    element: document.getElementById("fps"),
    model: model,
    key: "fps"
  });
}

// Helper Functions
function getOffsetRect(elem) {
  const box = elem.getBoundingClientRect()

  const body = document.body
  const docElem = document.documentElement

  const scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop
  const scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft

  const clientTop = docElem.clientTop || body.clientTop || 0
  const clientLeft = docElem.clientLeft || body.clientLeft || 0

  const top = box.top + scrollTop - clientTop
  const left = box.left + scrollLeft - clientLeft

  return {
    y: Math.round(top),
    x: Math.round(left)
  };
}

function scaleFrame(canvas, spriteSheet) {
  return {
    frameWidth: spriteSheet.getFrameWidth() / spriteSheet.getImageWidth() * canvas.width,
    frameHeight: spriteSheet.getFrameHeight() / spriteSheet.getImageHeight() * canvas.height,
  };
}

function clearSelection() {
  if (window.getSelection) {
    window.getSelection().removeAllRanges();
  } else if (document.selection) {
    document.selection.empty();
  }
}

// Frame Selector
function createFrameSelectorController(canvas, spriteSheet, model) {
  let clickedFrame;

  function getFrame(x, y) {
    const offset = getOffsetRect(canvas);
    const size = scaleFrame(canvas, spriteSheet);

    let row = Math.floor((event.clientY - offset.y) / size.frameHeight);
    row = row < 0 ? 0 : row;
    row = row >= spriteSheet.getNumRows() ? spriteSheet.getNumRows() - 1 : row;

    let column = Math.floor((event.clientX - offset.x) / size.frameWidth);
    column = column < 0 ? 0 : column;
    column = column >= spriteSheet.getNumColumns() ? spriteSheet.getNumColumns() - 1 : column;

    return {
      row,
      column
    };
  }

  function setFrame(x, y) {
    const frame = getFrame(x, y);

    model[model.selectedFrame + "Row"] = model.currentRow = frame.row;
    model[model.selectedFrame + "Column"] = model.currentColumn = frame.column;
  }

  function mouseSelectHover(event) {
    const offset = getOffsetRect(canvas);
    const size = scaleFrame(canvas, spriteSheet);

    const column = Math.floor((event.clientX - offset.x) / size.frameWidth);
    const row = Math.floor((event.clientY - offset.y) / size.frameHeight);

    if (row === model.startRow && column === model.startColumn) {
      model.selectedFrame = "start";
    } else if (row === model.endRow && column === model.endColumn) {
      model.selectedFrame = "end";
    } else {
      model.selectedFrame = undefined;
    }
  }
  canvas.addEventListener("mousemove", mouseSelectHover);

  function dragMouseMove(event) {
    setFrame(event.clientX, event.clientY);
  }

  function stopDrag(event) {
    document.removeEventListener("mousemove", dragMouseMove);
    document.removeEventListener("mouseup", stopDrag);
    canvas.addEventListener("mousemove", mouseSelectHover);
    model.selectedFrame = undefined;
  }

  function startDrag() {
    clearSelection();
    document.addEventListener("mousemove", dragMouseMove);
    document.addEventListener("mouseup", stopDrag);
    canvas.removeEventListener("mousemove", mouseSelectHover);
  }

  canvas.addEventListener("mousedown", (event) => {
    if (model.selectedFrame !== undefined) {
      startDrag();
    }
  });

  canvas.addEventListener("mouseleave", (event) => {
    stopDrag();
  });
}

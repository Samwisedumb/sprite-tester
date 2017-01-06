// #NEXT clean up view stuff
// #NEXT overall refactor
// #NEXT add the slider

function createController(model) {
  function bindViewModelNumber(key, _bindTo) {
    let bindTo = _bindTo ? _bindTo : [key];

    let elem = document.getElementById(key);
    elem.type = "number";

    elem.oninput = (event) => {
      let value = parseFloat(event.srcElement.value);
      value = isNaN(value) ? 0 : value;

      bindTo.forEach((key) => {
        model[key] = value;
      });
    }
  }

  bindViewModelNumber("startRow", ["startRow", "currentRow"]);
  bindViewModelNumber("startColumn", ["startColumn", "currentColumn"]);
  bindViewModelNumber("endRow");
  bindViewModelNumber("endColumn");
  bindViewModelNumber("fps");
}

function getOffsetRect(elem) {
  const box = elem.getBoundingClientRect()

  const body = document.body
  const docElem = document.documentElement

  const scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop
  const scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft

  const clientTop = docElem.clientTop || body.clientTop || 0
  const clientLeft = docElem.clientLeft || body.clientLeft || 0

  const top  = box.top +  scrollTop - clientTop
  const left = box.left + scrollLeft - clientLeft

  return {
    y: Math.round(top),
    x: Math.round(left)
  };
}

function scale(canvas, spriteSheet) {
  return {
    frameWidth: spriteSheet.getFrameWidth() / spriteSheet.getImageWidth() * canvas.width,
    frameHeight: spriteSheet.getFrameHeight() / spriteSheet.getImageHeight() * canvas.height,
  };
}

function createFramePickerController(canvas, spriteSheet, model) {
  let clickedFrame;

  function getFrame(x, y) {
    const offset = getOffsetRect(canvas);
    const size = scale(canvas, spriteSheet);

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

    model[clickedFrame + "Row"] = model.currentRow = frame.row;
    model[clickedFrame + "Column"] = model.currentColumn = frame.column;
  }

  function mouseMove(event) {
    setFrame(event.clientX, event.clientY);
  }
  function stopDrag(event) {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", stopDrag);
  }

  function startDrag() {
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", stopDrag);
  }

  canvas.onmousedown = (event) => {
    const offset = getOffsetRect(canvas);
    const size = scale(canvas, spriteSheet);

    const column = Math.floor((event.clientX - offset.x) / size.frameWidth);
    const row = Math.floor((event.clientY - offset.y) / size.frameHeight);

    if (row === model.startRow && column === model.startColumn) {
      clickedFrame = "start";
      startDrag();
    }
    else if (row === model.endRow && column === model.endColumn) {
      clickedFrame = "end";
      startDrag();
    }
  };
}

function createFramePickerView(canvas, spiteSheet, model) {
  const context = canvas.getContext("2d");

  function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
  function drawSpriteSheet() {
    context.drawImage(
      spriteSheet.getImage(),
      0,
      0,
      canvas.width,
      canvas.height
    );
  }
  function drawFrameSquare(color, row, column) {
    context.save();

    context.strokeStyle = color;

    const frameWidth = canvas.width / spriteSheet.getNumColumns();
    const frameHeight = canvas.height / spriteSheet.getNumRows();

    context.strokeRect(
      frameWidth * column,
      frameHeight * row,
      frameWidth,
      frameHeight
    );

    context.restore();
  }

  function draw() {
    clear();
    drawSpriteSheet();
    drawFrameSquare("#0000FF", model.startRow, model.startColumn);
    drawFrameSquare("#000000", model.endRow, model.endColumn);
    drawFrameSquare("#FF0000", model.currentRow, model.currentColumn);
  }

  return {
    draw
  };
}

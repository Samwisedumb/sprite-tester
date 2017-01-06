function createFrameSelectorView(canvas, spiteSheet, model) {
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

  function highlightFrameSquare(color, row, column) {
    context.save();

    context.fillStyle = color;

    const frameWidth = canvas.width / spriteSheet.getNumColumns();
    const frameHeight = canvas.height / spriteSheet.getNumRows();

    context.fillRect(
      frameWidth * column,
      frameHeight * row,
      frameWidth,
      frameHeight
    );

    context.restore();
  }

  // colors
  colors = {
    startStroke: "#0000FF",
    startFill: "#DDDDFF",
    endStroke: "#000000",
    endFill: "#DDDDDD",
    currentStroke: "#FF0000",
    currentFill: "#FFDDDD"
  };

  function draw() {
    clear();
    drawFrameSquare(colors.startStroke, model.startRow, model.startColumn); // start frame
    drawFrameSquare(colors.endStroke, model.endRow, model.endColumn); // end frame
    //drawFrameSquare(colors.currentBox, model.currentRow, model.currentColumn); // current frame

    //highlightFrameSquare(colors.startFill, model.startRow, model.startColumn); // start frame
    //highlightFrameSquare(colors.endFill, model.endRow, model.endColumn); // end frame
    highlightFrameSquare(colors.currentFill, model.currentRow, model.currentColumn); // current frame

    if (model.selectedFrame !== undefined) {
      const sel = model.selectedFrame;
      highlightFrameSquare(colors[sel + "Fill"], model[sel + "Row"], model[sel + "Column"]);
    }

    drawSpriteSheet();
  }

  return {
    draw
  };
}

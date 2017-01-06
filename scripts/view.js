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

  function draw() {
    clear();
    drawSpriteSheet();
    drawFrameSquare("#0000FF", model.startRow, model.startColumn); // start frame
    drawFrameSquare("#000000", model.endRow, model.endColumn); // end frame
    drawFrameSquare("#FF0000", model.currentRow, model.currentColumn); // current frame
  }

  return {
    draw
  };
}

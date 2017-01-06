function createModel() {
  let fps = 10;

  let startRow = 0;
  let startColumn = 1;
  let endRow = 0;
  let endColumn = 5;
  let currentRow = startRow;
  let currentColumn = startColumn;

  let sliderPosition = 0; // curr enumeration of a frame
  let renderScale = 1;

  let self = {
    fps,
    startRow,
    startColumn,
    endRow,
    endColumn,
    currentRow,
    currentColumn,
    sliderPosition,
    renderScale,
    step,
    nextFrame
  }

  // step
  let count = 0;
  function step() {
    count += self.fps;

    if (count >= 60) {
      count %= 60;
      nextFrame();
    }
  }

  // nextFrame
  function nextFrame() {
    if (self.startRow !== self.endRow) {
      self.currentRow++;
      if (self.currentRow > self.endRow) {
        self.currentRow = self.startRow;
      }
    }
    if (self.startColumn !== self.endColumn) {
      self.currentColumn++;
      if (self.currentColumn > self.endColumn) {
        self.currentColumn = self.startColumn;
      }
    }
  }

  return self;
}

const canvas = document.getElementById("spriteCanvas");
const spriteSheet = createSpriteSheet("images/Skeleton_Walk.png", 4, 9);
const model = createModel({
  startRow: 2,
  startColumn: 1,
  endRow: 2,
  endColumn: 8
});

const inputController = createInputController(model);

const frameSelectorViewCanvas = document.getElementById("frameSelectorCanvas");
const frameSelectorView = createFrameSelectorView(frameSelectorViewCanvas, spriteSheet, model);
const frameSelectorController = createFrameSelectorController(frameSelectorViewCanvas, spriteSheet, model);

spriteSheet.load().then(() => {
  startAnimation(canvas, spriteSheet, model, frameSelectorView);
}).catch((error) => {
  console.log(error);
});

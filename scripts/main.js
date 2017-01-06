const canvas = document.getElementById("spriteCanvas");
const spriteSheet = createSpriteSheet("images/Skeleton_Walk.png", 4, 9);
const model = createModel({
  startRow: 2,
  startColumn: 1,
  endRow: 2,
  endColumn: 8
});
const controller = createController(model);

const framePickerCanvas = document.getElementById("framePickerCanvas");
const framePickerView = createFramePickerView(framePickerCanvas, spriteSheet, model);
const framePickerController = createFramePickerController(framePickerCanvas, spriteSheet, model);

spriteSheet.load().then(() => {
  startAnimation(canvas, spriteSheet, model, framePickerView);
}).catch((error) => {
  console.log(error);
});

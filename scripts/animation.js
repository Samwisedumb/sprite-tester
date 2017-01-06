function startAnimation(canvas, spriteSheet, model) {
  const context = canvas.getContext("2d");

  function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.drawImage(
      spriteSheet.getImage(),
      spriteSheet.getFrameX(model.currentColumn),
      spriteSheet.getFrameY(model.currentRow),
      spriteSheet.getFrameWidth(),
      spriteSheet.getFrameHeight(),
      0,
      0,
      spriteSheet.getFrameWidth() * model.renderScale,
      spriteSheet.getFrameHeight() * model.renderScale
    );

    framePickerView.draw();

    model.step();

    window.requestAnimationFrame(animate);
  }

  animate();
}

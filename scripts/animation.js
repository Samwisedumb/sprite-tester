function startAnimation(canvas, spriteSheet, model, frameSelectorView) {
  const context = canvas.getContext("2d");

  function animate() {
    // Clear For Next Render
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Sprite
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

    // Draw Frame Selector
    frameSelectorView.draw();

    // Step Model
    model.step();

    // Loop Animation
    window.requestAnimationFrame(animate);
  }

  animate();
}

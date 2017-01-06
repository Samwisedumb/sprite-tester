function createSpriteSheet(url, numRows, numColumns) {
  // member variables
  const image = new Image();

  // functions
  function load() {
    return new Promise((resolve, reject) => {

      image.onload = () => {
        resolve(image);
      };

      image.onerror = () => {
        let msg = "Failed to load image at " + url;
        reject(new Error(msg));
      };

      image.src = url;
    });
  }

  // getters
  function getImage() {
    return image
  }

  function getFrameX(column) {
    return getFrameWidth() * column
  }

  function getFrameY(row) {
    return getFrameHeight() * row
  }

  function getFrameWidth() {
    return getImageWidth() / numColumns
  }

  function getFrameHeight() {
    return getImageHeight() / numRows
  }

  function getImageWidth() {
    return image.naturalWidth
  }

  function getImageHeight() {
    return image.naturalHeight
  }

  function getNumRows() {
    return numRows
  }

  function getNumColumns() {
    return numColumns
  }

  // public
  return {
    getImage,
    getFrameX,
    getFrameY,
    getFrameWidth,
    getFrameHeight,
    getImageWidth,
    getImageHeight,
    getNumRows,
    getNumColumns,
    load
  };
}

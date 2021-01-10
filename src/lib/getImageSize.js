/* export const imageSize = async (image) => {
  return new Promise((resolve, reject) => {
    try {
      const fileReader = new FileReader()

      fileReader.onload = () => {
        const img = new Image()

        img.onload = () => {
          resolve({ width: img.width, height: img.height })
        }

        img.src = fileReader.result
      }

      fileReader.readAsDataURL(image)
    } catch (e) {
      reject(e)
    }
  })
} */

export const imageSize = async (image, hasError, error) => {
  let promise = new Promise((resolve, reject) => {
    try {
      const fileReader = new FileReader()

      fileReader.onload = () => {
        const img = new Image()

        img.onload = () => {
          resolve({ width: img.width, height: img.height })
        }

        img.src = fileReader.result
      }

      fileReader.readAsDataURL(image)
    } catch (e) {
      reject(e)
    }
  });

  let { width, height } = await promise;

  const ImageMaxSize = 4000;
  const ImageMinSize = 200;

  if (width < ImageMinSize || height < ImageMinSize || width > ImageMaxSize || height > ImageMaxSize) {
    hasError = true;
    console.log('Error size')
    error = `Недопустимое разрешение(У вашего изображения ${width}*${height}). Допустимое разрешение min = 200px, max = 4000px`
  } else {
    error = ""
    console.log('OK!')
  }
  return { hasError, error }
}
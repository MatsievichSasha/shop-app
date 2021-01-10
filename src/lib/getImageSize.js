import { ACTIONS } from "../components/cards/cardsContext/cardsReduser"

export const imageSize = async (name, image, dispatch, formState) => {
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
  let hasError = false
  let error

  if (width < ImageMinSize || height < ImageMinSize || width > ImageMaxSize || height > ImageMaxSize) {
    hasError = true;
    console.log('Error size')
    error = `Недопустимое разрешение(Ваше изображения ${width}px*${height}px). Допустимое разрешение min = 200px, max = 4000px`
  } else {
    error = ""
    console.log('OK!')
  }
  let isFormValid = true
  dispatch({
    type: ACTIONS.CHANGE_FIELD,
    payload: {
      name,
      hasError,
      error,
      touched: false,
      isFormValid,
    }
  })
}

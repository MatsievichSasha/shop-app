import { ACTIONS } from "../components/cards/cardsContext/cardsReduser"

export const imageSize = async (name, file, dispatch, formState) => {

  let hasError = false
  let error = ''

  if (file.type === "image/jpeg" || file.type === "image/pjpeg" || file.type === "image/png" || file.type === "image/jpg") {
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

        fileReader.readAsDataURL(file)
      } catch (e) {
        reject(e)
      }
    });

    let { width, height } = await promise;

    const ImageMaxSize = 4000;
    const ImageMinSize = 200;

    console.log(0, file.type)

    console.log(1, file.type)
    if (width < ImageMinSize || height < ImageMinSize || width > ImageMaxSize || height > ImageMaxSize) {
      hasError = true;
      error = `Недопустимое разрешение(Ваше изображения ${width}px*${height}px). Допустимое разрешение min = 200px, max = 4000px`
    } else {
      error = ""
    }
  } else {
    hasError = true;
    console.log(2, file.type)
    error = "Недопустимый формат файла. Выберите другой файл (.jpg, .jpeg,.png)."
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

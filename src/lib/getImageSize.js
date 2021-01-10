import { ACTIONS } from "../components/cards/cardsContext/cardsReduser"
import dbApp from "firebase";

export const imageSize = async (name, file, dispatch, formState) => {

  let hasError = false
  let error = ''
  let value = ""
  try {
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
        const storageRef = dbApp.storage().ref();
        const fileRef = storageRef.child(`images/${file.name}`)
        await fileRef.put(file); //create ref for file
        value = await fileRef.getDownloadURL()
      }
    } else {
      hasError = true;
      error = "Недопустимый формат файла. Выберите другой файл (.jpg, .jpeg,.png)."
    }

    let isFormValid = true

    for (const key in formState) {
      const item = formState[key]
      // Check if the current field has error
      if (key === name && hasError) {
        isFormValid = false
        break
      } else if (key !== name && item.hasError) {
        // Check if any other field has error
        isFormValid = false
        break
      }
    }

    dispatch({
      type: ACTIONS.CHANGE_FIELD,
      payload: {
        name,
        value,
        hasError,
        error,
        touched: false,
        isFormValid,
      }
    })
  } catch (err) {
    console.log(err)
  }

}

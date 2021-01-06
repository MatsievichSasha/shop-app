export const checkForm = (e) => {
  let { name, value } = e.target;
  let number = value.trim();
  setValue({ ...values, [name]: value });
  if (name === "name") {
    if (value.length < 20 || value.length > 60) {
      setInputErrors({
        ...inputErrors,
        [name]: "минимум 20, максимум 60 символов",
      });
      if (!value) {
        setInputErrors({
          ...inputErrors,
          [name]: "Поле не может быть пустым",
        });
      }
    } else {
      setInputErrors({ ...inputErrors, [name]: "" });
    }
  } else if (name === "description") {
    if (value.length > 200) {
      setInputErrors({
        ...inputErrors,
        [name]: "максимум 200 символов",
      });
      if (!value) {
        setInputErrors({
          ...inputErrors,
          [name]: "",
        });
      }
    } else {
      setInputErrors({ ...inputErrors, [name]: "" });
    }
  } else if (name === "price") {
    let regexp = /^\d+(?:[.]\d\d)*$/gm;
    if (
      !(number && isFinite(number)) ||
      +value < 0.01 ||
      +value > 99999999.99 ||
      !regexp.test(value)
    ) {
      setInputErrors({
        ...inputErrors,
        [name]: "цена не корректна, пример: 10.99, min 0.01 - max 99999999.99",
      });

      if (!value) {
        setInputErrors({
          ...inputErrors,
          [name]: "Поле не может быть пустым",
        });
      }
    } else {
      setInputErrors({ ...inputErrors, [name]: "" });
    }
  } else if (name === "discount") {
    let regexp = /^[0-9]+$/;
    if (
      !(number && isFinite(number)) ||
      +value < 10 ||
      +value > 90 ||
      !regexp.test(value)
    ) {
      setInputErrors({
        ...inputErrors,
        [name]: "целое число от 10 до 90",
      });
      if (!value) {
        setInputErrors({
          ...inputErrors,
          discountDateEnd: "",
        });
        setInputErrors({ ...inputErrors, [name]: "" });
      }
    } else {
      setInputErrors({ ...inputErrors, [name]: "" });
    }
  } else if (name === "discountDateEnd") {
    let now = new Date();
    let checkingDate = new Date(value);
    if (checkingDate < now) {
      setInputErrors({
        ...inputErrors,
        [name]: "Дата окончания скидки должна быть больше текущей даты",
      });
    } else {
      setInputErrors({ ...inputErrors, [name]: "" });
    }
  }
};

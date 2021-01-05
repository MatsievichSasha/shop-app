"use strict";
{
  function checkLetters(name) {
    let regexp = /^\d+(?:[.,]\d\d)*$/gm;
    return regexp.test(name);
  }

  function checkNumbers(value, min, max) {
    let regexp = /^\d+(?:[.]\d\d)*$/gm;
    let number = value.trim();
    if (number && isFinite(number)) {
      if (min === undefined || max === undefined) {
        return true;
      } else if (+number >= min && +number <= max && regexp.test(number)) {
        return true;
      } else {
        return false;
      }
    } else return false;
  }

  function checkPrice(value, min, max) {
    let regexp = /^\d+(?:[.]\d\d)*$/gm;
    let number = value.trim();
    if (number && isFinite(number)) {
      if (min === undefined || max === undefined) {
        return true;
      } else if (+number >= min && +number <= max && regexp.test(number)) {
        return true;
      } else {
        return false;
      }
    } else return false;
  }

  function checkDiscount(value, min, max) {
    let regexp = /^\d+(?:)*$/gm;
    let number = value.trim();
    if (number && isFinite(number)) {
      if (min === undefined || max === undefined) {
        return true;
      } else if (+number >= min && +number <= max && regexp.test(number)) {
        let date = document.getElementById("date");
        date.setAttribute("required", true);
        return true;
      } else {
        date.setAttribute("required", false);
        return false;
      }
    } else {
      date.setAttribute("required", false);
      return false;
    }
  }

  function checkDate(value) {
    let discount = document.getElementById("discount");
    let now = new Date();
    let checkingDate = new Date(value);
    if (checkingDate - now) return true;
    else return false;
  }

  function isEmty(value) {
    return value.trim() === "" ? true : false;
  }

  function checkInputs(elem, formVerify) {
    let value = elem.value;
    let required = elem.dataset.hasOwnProperty("required"); //true false
    let typeValid = elem.dataset.validator;

    let statusInput;
    //checking that the input is empty
    if (isEmty(value)) {
      statusInput = !required;
    } else if (typeValid === "letters") {
      statusInput = checkLetters(value);
    } else if (typeValid === "price") {
      let min = elem.dataset.validatorMin;
      let max = elem.dataset.validatorMax;
      statusInput = checkPrice(value, min, max);
    } else if (typeValid === "discount") {
      
      let min = elem.dataset.validatorMin;
      let max = elem.dataset.validatorMax;
      statusInput = checkDiscount(value, min, max);
    } else if (typeValid === "date") {
      statusInput = checkDate(value);
    }

    if (!statusInput) {
      elem.classList.add(formVerify["inputErrorClass"]);
    }
    return statusInput;
  }

  // Код валидации формы
  window.validateForm = function (formVerify) {
    let form = document.getElementById(formVerify["formId"]);

    form.addEventListener(
      "focus",
      function (event) {
        let elem = event.target;
        if (elem.tagName === "INPUT") {
          elem.classList.remove(formVerify["inputErrorClass"]);
        }
      },
      true
    );

    form.addEventListener(
      "blur",
      function (event) {
        let elem = event.target;
        if (elem.tagName === "INPUT");
        {
          checkInputs(elem, formVerify);
        }
      },
      true
    );

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      let inputs = form.getElementsByTagName("input");

      form.classList.remove(formVerify["formInvalidClass"]);
      form.classList.remove(formVerify["formValidClass"]);

      let statusForm = [...inputs]
        .map((item) => checkInputs(item, formVerify))
        .find((item) => item === false);
      if (statusForm === false) {
        form.classList.add(formVerify["formInvalidClass"]);
      } else {
        form.classList.add(formVerify["formValidClass"]);
      }
    });
  };
}

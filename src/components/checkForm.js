import React from "react";

let fileTypes = [
  'image/jpeg',
  'image/pjpeg',
  'image/png',
  'image/jpg'
]

function validFileType(file) {
  for (var i = 0; i < fileTypes.length; i++) {
    if (file.type === fileTypes[i]) {
      return true;
    }
  }
  return false;
}

function getSizeImageFile(file) {
  let img = new Image()
  let result;
  img.onload = () => {
    var h = img.height;
    var w = img.width;
    if ((w < 200) || (h < 200) || (w > 4000) || (h > 4000)) {
      result = false
      return result
    } else {
      result = true
      return result
    }
  }
  img.src = window.URL.createObjectURL(file)
}

export const checkImage = (file, max, min) => {
  console.log(getSizeImageFile(file, max, min))
  
  if (validFileType(file) && getSizeImageFile(file, max, min)) {
      return true
    } else {
      return false
    }
}

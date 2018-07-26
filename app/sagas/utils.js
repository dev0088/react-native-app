
export function generateErrorMessage(response) {
  let errorMsg =
    response.ValidationErrors == null ||
    response.ValidationErrors == undefined
      ? 'Unexpected error!'
      : response.ValidationErrors[0]
  if (response.ValidationErrors != null &&
      response.ValidationErrors != undefined)
  {
    errorMsg = response.ValidationErrors[0]
  }
  else if ( response.ModelState != null &&
            response.ModelState != undefined)
  {
    Object.keys(response.ModelState).forEach(function(key) {
      errorMsg = response.ModelState[key][0]
      return
    })
  }
  return errorMsg
}

import defaultValues from '../constants/defaultValues'

export function getPrimaryColor(organizationColor) {
  return (organizationColor && organizationColor.primaryColor)
          ? organizationColor.primaryColor
          : defaultValues.DEFAULT_PRIMARY_COLOR
}

export function getSecondaryColor(organizationColor) {
  return (organizationColor && organizationColor.secondaryColor)
          ? organizationColor.secondaryColor
          : defaultValues.DEFAULT_SECONDARY_COLOR
}

export function getThirdColor(organizationColor) {
  return (organizationColor && organizationColor.thirdColor)
          ? organizationColor.thirdColor
          : defaultValues.DEFAULT_THIRD_COLOR
}

export function getFourthColor(organizationColor) {
  return (organizationColor && organizationColor.fourthColor)
          ? organizationColor.fourthColor
          : defaultValues.DEFAULT_FOURTH_COLOR
}

// export default uiColor = {
//   getPrimaryColor: getPrimaryColor
// }

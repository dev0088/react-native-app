import * as types from './actionTypes'
import { Actions } from 'react-native-router-flux'

export function checkedOnboardingWelcom() {
  console.log('=== action checkedOnboardingWelcom')
  return {
    type: types.CHECKED_ONBOARDING_WELCOME
  }
}

export function checkedOnboardingInteract() {
  return {
    type: types.CHECKED_ONBOARDING_INTERACT
  }
}

export function checkedOnboardingLearn() {
  return {
    type: types.CHECKED_ONBOARDING_LEARN
  }
}

export function checkedOnboardingReadToBegin() {
  return {
    type: types.CHECKED_ONBOARDING_READY_TO_BEGIN
  }
}

export function checkedOnboardingTrack() {
  return {
    type: types.CHECKED_ONBOARDING_TRACK
  }
}

export function checkedOnboardingSelf() {
  return {
    type: types.CHECKED_ONBOARDING_SELF
  }
}

export function checkedOnboardingWelcomToPursuit() {
  return {
    type: types.CHECKED_ONBOARDING_WELCOME_TO_PURSUIT
  }
}

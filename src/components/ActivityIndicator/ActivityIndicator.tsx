import 'react-activity/dist/Spinner.css'

import { ActivityIndicatorContainer, ActivityIndicatorContainerHalf } from './ActivityIndicator.styled'

import React from 'react'
import Spinner from 'react-activity/dist/Spinner'

type ActivityIndicatorProps = {
  withContainer?: boolean
}

export const ActivityIndicator = ({ withContainer }: ActivityIndicatorProps): JSX.Element => {
  const SpinnerComponent = <Spinner color="#fff" size={32} />

  if (withContainer) {
    return <ActivityIndicatorContainer>{SpinnerComponent}</ActivityIndicatorContainer>
  }

  return <ActivityIndicatorContainerHalf>{SpinnerComponent}</ActivityIndicatorContainerHalf>
}

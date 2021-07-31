import React from 'react'

function LoadingIndicatorFunction({ isLoading }) {
  if (!isLoading) {
    return null
  }

  return <span>로딩중...</span>
}

export default LoadingIndicatorFunction

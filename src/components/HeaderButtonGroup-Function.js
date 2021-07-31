import React from 'react'

function HeaderButtonGroupFunction({ onPreviousPage, onNextPage }) {
  return (
    <div>
      <button onClick={onPreviousPage}>이전 페이지</button>
      <button onClick={onNextPage}>다음 페이지</button>
    </div>
  )
}

export default HeaderButtonGroupFunction

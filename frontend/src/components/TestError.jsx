import React from "react"

const TestError = () => {
  const a = null
  return <div>{a.hello()}</div> // тут должна быть ошибка
}

export default TestError
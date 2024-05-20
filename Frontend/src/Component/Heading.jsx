import React from 'react'

function Heading({ title, tagline }) {
  return (
    <div>
    <h2 className="text-2xl font-bold">{title}</h2>
    <p className="text-lg">{tagline}</p>
  </div>
  )
}

export default Heading
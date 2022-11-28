import React from 'react'

const Checklist = (props) => {
  return (
    <div>
        <p>Name : {props.name}</p>
        <p>Status : {props.status}</p>
    </div>
  )
}

export default Checklist
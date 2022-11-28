import React from 'react'
import { Button } from 'react-bootstrap'

const Checklist = (props) => {
  return (
    <div>
        <p>Name : {props.name}</p>
        <p>Status : {props.status}</p>
        <Button onClick={props.delete}>Delete</Button>
    </div>
  )
}

export default Checklist
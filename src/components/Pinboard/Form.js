import React, {useState} from "react";
import "./Form.css"
import Card from 'react-bootstrap/Card'
import { Button, CardGroup, CardColumns } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'

export default function AdInd ({ad}) {
  const [count, setCount] = useState(0)

return (   
  <>
<div className="listings">
<CardColumns className="list">
<Card style={{ width: '18rem' }}>
  <Image className="images" variant="top" src={ad.profile_pic} roundedCircle />
  <Card.Body>
    <Card.Title>{ad.title}</Card.Title>
    <Card.Text>{ad.role}</Card.Text>
    <Card.Text>{ad.location}</Card.Text>
    <Card.Text>{ad.positions_available}</Card.Text>
<Button onClick={()=> console.log(setCount(count + 1))} variant="primary">Join</Button>
  </Card.Body>
</Card>
</CardColumns>
</div>
</>
)}
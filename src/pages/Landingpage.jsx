import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'



function Landingpage() {
  // function definition
  // redirect one page to another page we can use hook ie useNavigate() 
  const navigate=useNavigate()

  const handleNavigate=()=>{
    navigate('/home')
  }
  return (
    <>
     <Row>
      <Col></Col>
      <Col lg={6}>

      <h1>Welcome</h1>
      <p style={{textAlign:'justify'}}> Where user can use their favourite videoos.User can upload any toutube videos by copy and paste their url in to videooo.com will allow to add and remove their uploaded videos and also arrrange them in different categories by drag and drop it is free try it now!!!</p>

      <button onClick={handleNavigate} className='btn btn-success'>Click Here to Know More</button>
      </Col>
      <Col lg={5}>

        <img className='img-fluid' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnYE01rAlkuRsrAam6BSkOFmli0TCsZMbcXw&usqp=CAU"  alt="no image" />

      </Col>
      </Row> 
    </>
  )
}

export default Landingpage
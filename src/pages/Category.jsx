import React, { useEffect } from 'react'
import { useState } from 'react';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addCategory, deleteCategory, getAllCategory, getVideos, updateCategory } from '../service/allapi';
import { Trash2 } from 'react-feather';
import VideoCard from './VideoCard';



function Category() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [categoryItem, setcategoryItem] = useState({
    id: "", name: "", allVideos: []
  })

  const [allCategory, setAllCategory] = useState([])

  useEffect(() => {

    getCategoryList()

  }, [])


  // define function
  const addcategoryForm = (e) => {
    const { name, value } = e.target
    setcategoryItem({ ...categoryItem, [name]: value })
  }
  console.log(categoryItem);


  const handleAddCategory = async (e) => {
    e.preventDefault()
    const { id, name } = categoryItem
    if (!id || !name) {
      toast('please fill the form completely')

    }
    else {
      const response = await addCategory(categoryItem)
      console.log(response);

      if (response.status >= 200 && response.status <= 300) {
        setShow(false)

        toast.success('new category uploaded successfully', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })

        getCategoryList()

      }

      else {
        toast.warning("provide a unique id!!!!")
      }

    }
  }

  const getCategoryList = async () => {
    // api call for getCategory list
    const res = await getAllCategory()
    console.log(res);
    setAllCategory(res.data)
  }
  console.log(allCategory);

  const handleDeleteCategory = async (e, id) => {
    e.preventDefault()
    console.log(id);

    // api call
    await deleteCategory(id)
    getCategoryList()
  }
  // function define
  const dragOver = (e) => {
    e.preventDefault()
    console.log("dragging over the category board");

  }

  const dropped = async (e, categoryId) => {
    console.log("category Id:", categoryId);
    let sourceCardId = e.dataTransfer.getData("cardId")
    console.log("sourcecardId:", sourceCardId);

    // logic to implement adding card in the given category
    const { data } = await getVideos(sourceCardId)
    console.log('source video data', data);

    //  dropped category details
    let selectedCategory = allCategory.find(item => item.id == categoryId)
    console.log("target category details", selectedCategory);
    // to push rop data into array
    selectedCategory.allVideos.push(data)
    // update to frop data in allvideos array
    await updateCategory(categoryId, selectedCategory)
    getCategoryList()
  }

  return (
    <>
      <div className='d-grid'>
        <div onClick={handleShow} className='btn btn-dark m-2'> Add Category </div>
      </div>

      {
        allCategory.map(item => (

          <div droppable onDragOver={e => dragOver(e)} onDrop={e => dropped(e, item?.id)}>
            <div className='d-flex justify-content-between border rounded mt-3 '>
              <h4>{item.name}</h4>
              <span onClick={e => handleDeleteCategory(e, item?.id)}><Trash2 color='red' /></span>

              <Row>
                {
                  item?.allVideos.map((card) => (
                    <Col className='p-3 mb-1 sm={12}'>
                      <VideoCard card={card} insideCategory={true} />
                    </Col>
                  ))
                }
              </Row>

            </div>
          </div>

        ))
      }



      {/* modals */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

            <FloatingLabel className='mb-3' controlId="floatingid" label="ID">
              <Form.Control name='id' type="text" onChange={addcategoryForm} placeholder="Category ID" />
            </FloatingLabel>

            <FloatingLabel className='mb-3' controlId="floatingid" label="Category">
              <Form.Control name='name' type="text" onChange={addcategoryForm} placeholder="Category" />
            </FloatingLabel>



          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleAddCategory} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default Category
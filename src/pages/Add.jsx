import React from 'react'
import { PlusCircle } from 'react-feather'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FloatingLabel, Form } from 'react-bootstrap';
import { addVideo } from '../service/allapi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Add({handleresponse}) {
    const [uploaddata, setuploaddata] = useState({

        id: "",
        caption: "",
        thumbnail: "",
        url: ""
    })

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // define setInput function
    const setInput = (e) => {
        const { name, value } = e.target
        setuploaddata({ ...uploaddata, [name]: value })
    }

    console.log(uploaddata);

    // extract embedded url from youtube original url

    const extractUrl = (e) => {

        let youtubeUrl = e.target.value

        if (youtubeUrl.includes("v=")) {
            let index = youtubeUrl.indexOf("v=")
            console.log(index);
            let videoUrl = youtubeUrl.substring(index + 2, index + 13)
            console.log(videoUrl);
            let videodata = uploaddata
            videodata.url = `https://www.youtube.com/embed/${videoUrl}`

            setuploaddata(videodata)
        }

        console.log(uploaddata);
    }


    const handleAdd = async () => {
        const { id, caption, thumbnail, url } = uploaddata

        if (!id || !caption || !thumbnail || !url) {
            toast('please fill the form completely')
        }
        else {
            // make api call
            const response = await addVideo(uploaddata)

            if (response.status >= 200 && response.status <= 300) {
                // console.log(response.data);

                handleresponse(response.data)

                setShow(false)
                toast.success('new video uploaded successfully', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })

            }
            else {
                toast.warning('provide an unique id !!!')
            }
        }
    }

    // https://youtu.be/8kooIgKESYE?feature=shared
    // <iframe width="873" height="491" src="https://www.youtube.com/embed/8kooIgKESYE" title="Interstellar theme song - video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


    return (
        <>
            <div onClick={handleShow} className='btn'>
                <PlusCircle color='green' size={80} />
            </div>

            {/* modal */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Upload Video Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <FloatingLabel className='mb-3' controlId="floatingid" label="Upload video id">
                            <Form.Control onChange={setInput} name='id' type="text" placeholder="Uploading video id" />
                        </FloatingLabel>

                        {/* caption */}
                        <FloatingLabel className='mb-3' controlId="floatingid" label="Upload Video Caption">
                            <Form.Control onChange={setInput} name='caption' type="text" placeholder="video Caption" />
                        </FloatingLabel>

                        {/* video cover image url */}
                        <FloatingLabel className='mb-3' controlId="floatingid" label="Video Cover Image URL">
                            <Form.Control onChange={setInput} name='thumbnail' type="text" placeholder="Video cover image url" />
                        </FloatingLabel>
                        {/* uploading video link */}
                        <FloatingLabel className='mb-3' controlId="floatingid" label="Video Link">
                            <Form.Control onChange={extractUrl} name='url' type="text" placeholder="Video linkl" />
                        </FloatingLabel>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleAdd} variant="primary">Add</Button>
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

export default Add
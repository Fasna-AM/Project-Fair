import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import imageUpload from '../assets/imageUpload.png'
import { addProjectAPI } from '../services/allAPI';
import { addProjectResponseContext } from '../context/ContextApi';

const Add = () => {

  const {addProjectResponse,setAddProjectResponse}= useContext(addProjectResponseContext)
  const [preview,setPreview] = useState("")
  const [imageFileStatus,setImageFileStatus] = useState(false)
  const [projectDetails,setProjectDetails] = useState({
    title:"",language:"",overview:"",github:"",website:"",projectImg:""
  })
  // console.log(projectDetails);

  useEffect(()=>{
    if(projectDetails.projectImg.type=="image/png" || projectDetails.projectImg.type=="image/jpg" || projectDetails.projectImg.type=="image/jpeg"){
      // valid image
      setImageFileStatus(true)
      setPreview(URL.createObjectURL(projectDetails.projectImg))
    }else{
      // invalid image
      setImageFileStatus(false)
      setPreview("")
      setProjectDetails({...projectDetails,projectImg:""})
    }
  },[projectDetails.projectImg])
  
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setPreview("")
    setImageFileStatus(false)
    setProjectDetails({title:"",language:"",overview:"",github:"",website:"",projectImg:""})
  }
  const handleShow = () => setShow(true);

  const handleAddProject = async ()=>{
    const {title,language,overview,github,website,projectImg} = projectDetails
    if(title && language && overview && github && website && projectImg){
      // alert("make api")
      const reqBody = new FormData() // reqbody in formdata becuse its includes file
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("projectImg",projectImg)
      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        // make api call
        try{
          const result  =await addProjectAPI(reqBody,reqHeader)
          if(result.status==200){
            alert("Project added successfully!!!")
            setAddProjectResponse(result)
            handleClose()
          }else{
            alert(result.response.data)
          }

        }catch(err){
          console.log(err);
          
        }
      }

    }else{
      alert("Please fill the form completely!!!!")
    }
  }

  return (

    <>
      <button onClick={handleShow} className="btn btn-primary">+ New Project</button>
      <Modal size='lg' centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>New Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row align-items-center">
            <div className="col-lg-4">
              <label>
                <input onChange={e=>setProjectDetails({...projectDetails,projectImg:e.target.files[0]})} type="file" style={{ display: "none" }} />
                <img height={"150px"} className='img-fluid' src={preview?preview:imageUpload} alt="" />
              </label>
              { !imageFileStatus && <div className="text-warning fw-bolder my-2">* Upload Only the following file types (jpeg,jpg,png) here !!!</div>}
            </div>
            <div className="col-lg-8">
              <div className="mb-2">
                <input value={projectDetails.title} onChange={e=>setProjectDetails({...projectDetails,title:e.target.value})} type="text" placeholder='Project Title' className='form-control' />
              </div>
              <div className="mb-2">
                <input value={projectDetails.language} onChange={e=>setProjectDetails({...projectDetails,language:e.target.value})} type="text" placeholder='Language Used In Project ' className='form-control' />
              </div>
              <div className="mb-2">
                <input value={projectDetails.overview} onChange={e=>setProjectDetails({...projectDetails,overview:e.target.value})} type="text" placeholder='Project Overview' className='form-control' />
              </div>
              <div className="mb-2">
                <input value={projectDetails.github} onChange={e=>setProjectDetails({...projectDetails,github:e.target.value})} type="text" placeholder='Project Github Link' className='form-control' />
              </div>
              <div className="mb-2">
                <input value={projectDetails.website} onChange={e=>setProjectDetails({...projectDetails,website:e.target.value})} type="text" placeholder='Project Website Link' className='form-control' />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAddProject} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Add
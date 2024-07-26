import React, { useState } from 'react'
import './App.css'

const App = () => {

  const [id, setId] = useState("")
  const [image, setImage] = useState({})
  const [url, seturl] = useState("")
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [price, setPrice] = useState("")
  const [rating, setRating] = useState("")


  function handleUpload(e) {
    e.preventDefault()

    const formdata = new FormData()

    formdata.append("file", image)
    formdata.append("upload_preset", "erfanaalam")

    fetch("https://api.cloudinary.com/v1_1/erfanaalam/image/upload", {

      method: "POST",
      body: formdata

    }).then(async (response) => {
      const result = await response.json()
      seturl(result.secure_url)
      addProduct(result.secure_url)
    })
      .catch((err) => {
        alert("Product failed to add")
        console.log(err);
      })
  }

  async function addProduct(imgUrl){
    let obj = {
      id,
      img:imgUrl,
      title,
      desc,
      price,
      rating
    }

  await  fetch("https://productstoreapi-backend.onrender.com/addProduct", {
      method: "POST",

      headers:{ "content-type":"application/json"},

      body : JSON.stringify(obj)
    }).then(()=>{
      alert("Product added succesfully")
      setId("")
      setImage("")
      setTitle("")
      setDesc("")
      setPrice("")
      setRating("")
    })
  }

  return (
    <>
      <div className='maindiv'>
        <h1>Add Product</h1>
        <form action="" onSubmit={(e) => handleUpload(e)} className='form'>
          <div className='div'>
            <label className='lable' htmlFor="id">Enter Id of product</label>
            <input type="text" name="id" id="id" value={id} onChange={(e) => setId(e.target.value)} />
          </div>
          <div className='div'>
            <label className='lable' htmlFor="image">Enter Image of product</label>
            <input type="file" name="file" id="image"  onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className='div'>
            <label className='lable' htmlFor="title">Enter Title of product</label>
            <input type="text" name="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className='div'>
            <label className='lable' htmlFor="desc">Enter Desc of product</label>
            <input type="text" name="desc" id="desc" value={desc} onChange={(e) => setDesc(e.target.value)} />
          </div>
          <div className='div'>
            <label className='lable' htmlFor="price">Enter Price of product</label>
            <input type="text" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div className='div'>
            <label className='lable' htmlFor="rating">Enter Rating of product</label>
            <input type="text" name="rating" id="rating" value={rating} onChange={(e) => setRating(e.target.value)} />
          </div>

          <button type='submit' className='btn' >Submit</button>
        </form>

      </div>
    </>
  );
};

export default App
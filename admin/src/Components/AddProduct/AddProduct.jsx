import React, { useState } from 'react'
import "./AddProduct.css"
import upload_area from "../../assets/upload_area.svg"

const AddProduct = () => {
  const [image, setIamge] = useState(false)
  const [productDetails, setProductDetails] = useState({
    name:"",
    image:"",
    category:"women",
    new_price:"",
    old_price:""
  })
  
  const imagehandler=(e)=>{
     setIamge(e.target.files[0])
  }

  const changeHandler=(e)=>{
    setProductDetails({...productDetails,[e.target.name]:e.target.value})
  }

  const Add_Product = async () => {
    console.log(productDetails);
  
    let responseData;
    let product = productDetails;
  
    let formData = new FormData();
    formData.append('product', image);
  
    try {
      // Upload the image
      const responseImage = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });
      
      responseData = await responseImage.json();
    } catch (error) {
      console.error('Error uploading image:', error);
      return; // Stop further execution if image upload fails
    }
  
    if (responseData.success) {
      product.image = responseData.image_url;
      console.log('product', product);
  
      try {
        // Add the product
        const responseProduct = await fetch('http://localhost:4000/addproduct', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        });
  
        const data = await responseProduct.json();
        
        data.success ? alert('Product Added') : alert('Failed to Add');
      } catch (error) {
        console.error('Error adding product:', error);
        alert('Failed to Add'); // Handle error when adding the product
      }
    }
  };

  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type here' />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type here' />
        </div>
      </div>
      <div className='addproduct-itemfield'>
         <p>Product Category</p>
         <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
         </select>
      </div>
      <div className='addproduct-itemfield'>
        <label htmlFor="file-input">
          <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumnail-img' alt="upload area" />
        </label>
        <input onChange={imagehandler} type="file" name='image' id='file-input' hidden/>
      </div>
      <button onClick={()=>{Add_Product()}} className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default AddProduct

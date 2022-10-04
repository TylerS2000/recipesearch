import React from 'react';
import './App.css';

export default function App() {
  const[formData, setFormData] = React.useState({search:"", CHF:false, CKD:false,lowCalorie:false,diabetes:false,})

  function handleChange(event){
  setFormData((prevFormData)=>{
    return {...prevFormData,[event.target.name]:event.target.type==="checkbox"?event.target.checked:event.target.value}
  })}

  function nutrientCompile(){
    let nutrients = ""
    if(formData.CHF===true){nutrients+="&nutrients%5BNA%5D=1-500"
    }
    if(formData.CKD===true){"&nutrients%5BNA%5D=1-500"}
    if(formData.lowCalorie===true){"&nutrients%5BNA%5D=1-500"}
    if(formData.diabetes===true){"&nutrients%5BNA%5D=1-500"}
    console.log(nutrients)
    return(nutrients)
  }

  let urlSearch = formData.search.replace(/ /g,'%20')

  function apiDisplay(){
  let link = `https://api.edamam.com/api/recipes/v2?type=public&q=${urlSearch}&app_id=c14b2b58&app_key=%202c98f30d984b3e72b61db15220ae83ef${nutrientCompile()}`
  console.log(link)
  fetch(link)
  .then(response=>response.json())
  .then(data=> console.log(data))}

  return(
    <div>
    <input type="text"  onChange={handleChange}  name="search"/>
    <div>
      <input type="checkbox" id="CHF" name='CHF' checked={formData.CHF} onChange={handleChange}/>
      <label htmlFor='CHF'>CHF</label>
      <input type="checkbox" id = "CKD" name='CKD' checked={formData.CKD} onChange={handleChange}/>
      <label htmlFor='CKD'>CKD</label>
      <input type="checkbox" name='lowCalorie' checked={formData.lowCalorie} onChange={handleChange}/>
      <label htmlFor='CKD'>Low Calorie</label>
      <input type="checkbox"id='diabetes' name='diabetes' checked={formData.diabetes} onChange={handleChange}/>
      <label htmlFor='diabetes'>Diabetes</label>
    </div>
    <button onClick={apiDisplay}>Search</button> 

    </div>
)
  }


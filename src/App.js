import React from 'react';
import './App.css';

export default function App() {
  const[formData, setFormData] = React.useState({search:"", CHF:false, CKD:false,lowCalorie:false,diabetes:false,})
  const[apiData, setApiData]=React.useState([])

  function handleChange(event){
  setFormData((prevFormData)=>{
    return {...prevFormData,[event.target.name]:event.target.type==="checkbox"?event.target.checked:event.target.value}
  })}

  function nutrientCompile(){
    let nutrients = ""
    if(formData.CHF===true){nutrients+="&nutrients%5BNA%5D=1-500"
    }
    if(formData.CKD===true){}
    if(formData.lowCalorie===true){}
    if(formData.diabetes===true){}
    console.log(nutrients)
    return(nutrients)
  }

  let urlSearch = formData.search.replace(/ /g,'%20')

  

function apiDisplay(){
  let link = `https://api.edamam.com/api/recipes/v2?type=public&q=${urlSearch}&app_id=c14b2b58&app_key=%202c98f30d984b3e72b61db15220ae83ef${nutrientCompile()}`
  console.log(link)
  fetch(link)
  .then(response=>response.json())
  .then(data=> setApiData(data.hits))}
console.log(apiData);


function Stuff(){if(apiData.length===0){return }else{return apiData.map(x=>

<div className='recipes'  >
<a href={x.recipe.url}>
  <img src={x.recipe.image} alt="recipe"/>
  <div className='recipe'>
    <div className='title'>
      <h3>{x.recipe.label}</h3>
    </div>
    <div className='nutrientspecs'>
      <div className='macro'>
        <p> Kcals: {Math.round(x.recipe.calories/x.recipe.yield)}</p>
        <p>Carbohydrates: {Math.round(x.recipe.totalNutrients.CHOCDF.quantity/x.recipe.yield)}</p>
        <p> Protein: {Math.round(x.recipe.totalNutrients.PROCNT.quantity/x.recipe.yield)}</p>
        <p>Fat: {Math.round(x.recipe.totalNutrients.FAT.quantity/x.recipe.yield)}</p>

      </div>
      <div className='micro'>
      <p> Sodium: {Math.round(x.recipe.totalNutrients.NA.quantity/x.recipe.yield)}mg</p>
        <p>Potassium: {Math.round(x.recipe.totalNutrients.K.quantity/x.recipe.yield)}mg</p>
        <p> Phosphorus: {Math.round(x.recipe.totalNutrients.P.quantity/x.recipe.yield)}mg</p>
        
      </div>
    </div>
  </div>
  </a>
</div>
)}}




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
    <div className='recipesContainer'>
      <Stuff/>
    </div>
    </div>
)
  }


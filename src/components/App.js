import React, {useEffect, useState} from "react";
import NavBar from "./NavBar";
import DisplayInfo from "./DisplayInfo";

function App() {
  const [puppies, setPuppies] = useState([])
  const [clickedPuppy, setClickedPuppy] = useState("")
  const [goodPups, setGoodPups] = useState(true)
  function getFetch() {
    fetch("http://localhost:3001/pups")
    .then(response => response.json())
    .then(pups => setPuppies(pups))
  }

  useEffect(() => { 
    getFetch()
  }, [])

  function displayPup (puppy) { 
    setClickedPuppy(() => puppy)
  }

  function handleFilter() {
    setGoodPups(() => !goodPups)
    const newPuppiesArray = puppies.filter((puppy) => {
      if ( goodPups === false) {
        return puppy;
      }else {
        return puppy.isGoodDog === goodPups   
      }
    })
    if(goodPups === false) {
    getFetch()
    setPuppies(puppies)
  }else if (goodPups === true){
    setPuppies(newPuppiesArray)
  }
}

  function handleButtonClick () {
    fetch(`http://localhost:3001/pups/${clickedPuppy.id}`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify({isGoodDog: !clickedPuppy.isGoodDog})
    })
    .then(response => response.json())
    .then(newData => {
      getFetch()
      setClickedPuppy(newData)}
    )
  }

  return (
    <div className="App">
        <div id="filter-div">
            <button id="good-dog-filter" onClick={handleFilter} value={goodPups} >Filter good dogs: {goodPups === false ? 'ON' : 'OFF'}</button>
        </div>
        <NavBar puppies={puppies} displayPup={displayPup} />
        <DisplayInfo clickedPuppy={clickedPuppy} handleButtonClick={handleButtonClick}/>
    </div>
  );
}

export default App;
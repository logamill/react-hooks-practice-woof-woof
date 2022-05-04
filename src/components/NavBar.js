import React from 'react'

function NavBar({puppies, displayPup}) {

  return (
    <div id="dog-bar">
      {puppies.map(puppy => { 
        return <span onClick={() => displayPup(puppy)} key={puppy.id}>{puppy.name}</span>
      })}
    </div>
  )
}

export default NavBar;
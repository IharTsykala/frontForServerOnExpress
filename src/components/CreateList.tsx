import React, { useState, useEffect } from "react"
import Service from "../services/service-user"

const ListPets = (id?: any) => {
  const [pets, setPets]: any = useState("")

  useEffect(() => {
    ;(async () => {
      try {
        const listPets = await Service.getListPetsByUserID(id)
        setPets(listPets)
        console.log(listPets)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [id])

  return (
    <ul>
      {pets.length > 0 &&
        pets.map((pet: any) => (
          <li key={pet._id}>
            <p>{`${pet.name} ${pet.species}`}</p>
          </li>
        ))}
      {!pets.length && <p>Your list pets is empty</p>}
    </ul>
  )
}

export default ListPets

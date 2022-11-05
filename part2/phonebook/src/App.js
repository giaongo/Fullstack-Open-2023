import { useEffect, useState } from "react"
import axios from "axios"
import personService  from "./services/personService"
// Filter component
const Filter = ({filterChangeMethod}) => {
  return (
    <div>
    filter shown with <input onChange={filterChangeMethod}/>
    </div>
  )
}

// Person component
const Person = (props) => {
  const {person,deletePerson} = props
  return (
    <div>{person.name} {person.phone} <button onClick={()=> {
      if(window.confirm(`Delete ${person.name} ?`)) {
        deletePerson(person.id)
      }
    }}>delete</button>
    </div>
  )
}

// PersonForm component
const PersonForm = (props) => {
  const {formSubmitMethod, nameChangeMethod, phoneChangeMethod, newName, phoneNumber} = props
  return (
    <form onSubmit={formSubmitMethod}>
        <div>
          name: <input onChange={nameChangeMethod} value = {newName}/>
        </div>
        <div>
          number: <input onChange={phoneChangeMethod} value={phoneNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = ({filterName, persons, deletePerson}) => {
  const filterNumberList = (filterName) => {
    if(filterName.length !== 0) {
      return persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
    }
    return persons
  }
  return (
    filterNumberList(filterName).map(person => 
    <Person 
      key={person.id} 
      person={person} 
      deletePerson={deletePerson}/>)
  )
}
// App component
const App = () => {
  const [persons, setPersons] = useState ([])
  const [newName, setNewName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [filterName, setFilterName] = useState("")

  useEffect(() => {
      personService.getPersons()
      .then(personList => {
        setPersons(personList)
      })
  },[])

  // Function handling name change in input
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  // Function handling phone change in input
  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value)
  }
  // Function checking name existing in persons array
  const nameExisting = (name) => persons.some(person => person.name === name)

  // Function handling filterName change in input
  const handleNameFilter = (event) => {
    setFilterName(event.target.value)
  }
  // Function handling form submission
  const handleFormSubmit = (event) => {
    event.preventDefault()
    if (nameExisting(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {name:newName, number:phoneNumber}
      personService.addPerson(newPerson)
        .then(person => {
          setPersons([...persons,person])
          setNewName("") 
          setPhoneNumber("") 
        })
    }
  }
  // Function handling delete feature 
  const handleDeletePerson = (id) => {
    const newPersonListAfterDelete = persons.filter(person => person.id !== id)   
    personService.deletePerson(id)
    .then(result => {
      if(result.status = "200") {
        setPersons(newPersonListAfterDelete)
      }
    })

  }
  return (
    <div style = {{margin:"25px"}}>
      <h2>Phonebook</h2>
      <Filter filterChangeMethod={handleNameFilter} />
      <h2>add a new</h2>
      <PersonForm 
          formSubmitMethod = {handleFormSubmit}
          nameChangeMethod = {handleNameChange}
          phoneChangeMethod = {handlePhoneChange}
          newName =  {newName}
          phoneNumber =  {phoneNumber}/>
      <h2>Numbers</h2>
      <Persons filterName={filterName} persons={persons} deletePerson = {handleDeletePerson}/>
    </div>
  );
}

export default App;

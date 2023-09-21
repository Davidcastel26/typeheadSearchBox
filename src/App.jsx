import {SearchBox} from './searchBox/index'
import './App.css'
import {ListBox} from './listBox'

function App() {

  const transformData = ( data ) => data.results

  const dataPromise = async ( query, signal ) => 
    await fetch(`https://swapi.dev/api/people/?search=${query}`,{signal})

  return (
    <div className='wrapper'>
      <SearchBox 
        id="personName"
        name="personName"
        label="Enter Person Name"
        placeholder="Enter your fav star war char"
        autoComplate={true}
        maxItems={5}
        styles={{
          label:"",
          input:""
        }}
        debounceWait={400}
        listBox={(items) => <ListBox items={items} />}
        noItemMessage={() => <div> Sorry no person found</div>}
        errorMessage={() => <div> Sorry no person found</div>}
        transformData={transformData}
        dataPromise={dataPromise}
      />
    </div>
  )
}

export default App
 
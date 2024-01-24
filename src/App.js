import React, { useState , useEffect } from 'react';
import { moviesInDB, push, onValue } from './data';
import './index.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [addedValues, setAddedValues] = useState([]);

  useEffect(() => {
    // adding an event listener for check the updates in data
    const unsubscribe = onValue(moviesInDB, (snapshot) => {
      const data = snapshot.val();
      // if there is smth in data so update the state
      if (data) {
        setAddedValues(Object.values(data));
      }
    });

    // remove the event listener when exit from the component
    return () => unsubscribe();
  }, []); // [empty array] means the effect will be called only after the component is mounted


  const handleClick = () => {
    // add value to the database
    push(moviesInDB, inputValue);
    // updating the state with a new value
    const newValue = `${inputValue}`;
    setAddedValues([...addedValues, newValue]);
    setInputValue('');
  };

  const handleKeyPress = (e) => {
    // check if Enter is pressed to call handleClick
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  const handleRemove = (index) => {
    /*  
        filter: creates a new array, including only those elements that pass a specified condition. 
        (_, i): a callback function that takes two arguments. 
        The first argument, _, indicates that we are not using it 
        (if the argument is not used, it is conventionally denoted as _ or unused). 
        The second argument, i, is the index of the current element.
        i !== index: This condition checks whether the current index i is not equal to the value of index. 
        If true, this element will be included in the new array.
        Therefore, filter((_, i) => i !== index) creates a new array, 
        including all elements except the one with an index equal to index.
     */
    const updatedValues = addedValues.filter((_, i) => i !== index);
    setAddedValues(updatedValues);
  };

  return (
    <div className="container">
      <h1>Watch later</h1>
      <div className="field">
        <input
          type="text"
          id="input-field"
          placeholder="Type the title"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
            <div>
      <button id="add-button" onClick={handleClick}>
        +
      </button>
    </div>
      </div>
      <div className="movie-list">
        <ul>
          {addedValues.map((value, index) => (
            <li key={index} onClick={() => handleRemove(index)}>
              {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
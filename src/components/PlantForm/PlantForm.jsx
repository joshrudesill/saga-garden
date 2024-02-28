import React, { useState } from "react";
import { useDispatch } from "react-redux";

const PlantForm = () => {
  const dispatch = useDispatch();

  //Initial state is an OBJECT, with keys id and name
  let [newPlant, setPlant] = useState({ name: "" });

  const handleNameChange = (event) => {
    //Similar to in redux -- we dont want to get rid of the id field when we update name
    setPlant({ ...newPlant, name: event.target.value });
  };

  const addNewPlant = (event) => {
    event.preventDefault();
    dispatch({ type: "POST_PLANT", payload: newPlant });
    //updates the next plant to have a new id
    setPlant({ name: "" });
  };
  return (
    <div>
      <form onSubmit={addNewPlant}>
        <input type='text' value={newPlant.name} onChange={handleNameChange} />
        <input type='submit' value='Add New Plant' />
      </form>
    </div>
  );
};

export default PlantForm;

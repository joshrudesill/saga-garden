import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function PlantList() {
  const dispatch = useDispatch();

  const reduxState = useSelector((store) => store.plantList);

  useEffect(() => {
    // dispatch an action to request the plantList from the API
    dispatch({ type: "FETCH_PLANT" });
  }, []);

  return (
    <div>
      <h3>This is the plant list</h3>
      {reduxState.map((p) => (
        <div>
          <div>{p.name}</div>
          <button
            onClick={() => dispatch({ type: "DELETE_PLANT", payload: p.id })}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default PlantList;

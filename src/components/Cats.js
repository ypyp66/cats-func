import React, { useEffect, useState } from "react";
import { getCatBreeds } from "../lib/api";
import "./Cats.scss";
function Cats() {
  const initialState = {
    currentPage: 1,
    breeds: [],
    isLoading: false,
  };

  const [state, setState] = useState(initialState);

  async function breeds() {
    const result = await getCatBreeds(state.currentPage);
    return result;
  }

  useEffect(() => {
    breeds().then((res) => {
      setState({
        ...state,
        breeds: res,
      });
    });
  }, []);

  useEffect(() => {
    console.log(state.breeds);
  }, [state.breeds]);

  return (
    <div className="Cats">
      <ul>
        {state.breeds.map((breed, index) => (
          <li className="Cat" key={`${breed.id}-${index}`}>
            <span>Name: {breed.name}</span>
            <span>Origin: {breed.origin}</span>
            <span>Description: {breed.description}</span>
            <span>
              Wiki:{" "}
              <a href={breed.wikipedia_url} target="_blank" rel="noreferrer">
                {breed.wikipedia_url}
              </a>
            </span>
            <img
              className="Image"
              src={breed.image ? breed.image.url : null}
              alt="사진"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cats;

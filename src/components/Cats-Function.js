import React, { useEffect, useState, useCallback } from "react";
import { getCatBreeds } from "../lib/api";
import "./Cats.scss";
import HeaderButtonGroupFunction from "./HeaderButtonGroup-Function";
import LoadingIndicatorFunction from "./LoadingIndicator-Function";

function CatsFunction() {
  const initialState = {
    currentPage: 1,
    breeds: [],
    isLoading: false,
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    setState({
      ...state,
      isLoading: true,
    });
    breeds().then((res) => {
      setState({
        ...state,
        breeds: res,
        isLoading: false,
      });
    });
  }, [state.currentPage]);

  const breeds = useCallback(async () => {
    const result = await getCatBreeds(state.currentPage);
    return result;
  }, [state.currentPage]);

  const handlePreviousPage = useCallback(() => {
    if (state.currentPage <= 1) {
      return;
    }

    setState({
      ...state,
      currentPage: state.currentPage - 1,
    });
  }, [state.currentPage]);

  const handleNextPage = useCallback(() => {
    setState({
      ...state,
      currentPage: state.currentPage + 1,
    });
  }, [state.currentPage]);

  return (
    <div className="Cats">
      <p>현재 페이지: {state.currentPage}</p>
      <HeaderButtonGroupFunction
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
      />
      <LoadingIndicatorFunction isLoading={state.isLoading} />
      <ul>
        {state.breeds.map((breed, index) => (
          <li className="Cat" key={`${breed.id}-${index}`}>
            <span>Name: {breed.name}</span>
            <span>Origin: {breed.origin}</span>
            <span>Description: {breed.description}</span>
            <span>
              Wiki:
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

export default CatsFunction;

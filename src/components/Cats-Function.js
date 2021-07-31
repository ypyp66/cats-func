import React, { useEffect, useState, useCallback } from "react";
import { getCatBreeds } from "../lib/api";
import "./Cats.scss";
import HeaderButtonGroupFunction from "./HeaderButtonGroup-Function";
import LoadingIndicatorFunction from "./LoadingIndicator-Function";

function CatsFunction() {
  const [currentPage, setCurrentPage] = useState(1);
  const [breeds, setBreeds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
    getBreeds().then((res) => {
      setIsLoading(false);
      setBreeds(res);
    });
  }, [currentPage]);

  const getBreeds = useCallback(async () => {
    const result = await getCatBreeds(currentPage);

    return result;
  }, [currentPage]);

  const handlePreviousPage = useCallback(() => {
    if (currentPage <= 1) {
      return;
    }
    setCurrentPage((prev) => prev - 1);
  }, [currentPage]);

  const handleNextPage = useCallback(() => {
    if (!breeds) return;
    setCurrentPage((prev) => prev + 1);
  }, [currentPage]);

  return (
    <div className="Cats">
      <p>현재 페이지: {currentPage}</p>
      <HeaderButtonGroupFunction
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
      />
      <LoadingIndicatorFunction isLoading={isLoading} />
      <ul>
        {breeds.map((breed, index) => (
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

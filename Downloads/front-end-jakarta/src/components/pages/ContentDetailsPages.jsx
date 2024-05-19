import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import '../Carousel.css';
import { API_URLS } from '../../config/api';

export const ContentDetailsPages = () => {
  const { id } = useParams();
  const initialSlideIndex = parseInt(id - 1, 10) || 0;

  const [slides, setSlides] = useState([]);
  const [culinaries, setCulinaries] = useState([]);
  const [slideIndex, setSlideIndex] = useState(initialSlideIndex);

  useEffect(() => {
    // Fetch carousel data from the API
    fetch(API_URLS + '/sight')
      .then((response) => response.json())
      .then((data) => {
        setSlides(
          data.map((item) => ({
            src: item.imageUrl,
            alt: item.name,
            description: item.description || item.category,
            location: item.location || 'No location provided'
          }))
        );
      })
      .catch((error) => console.error('Failed to fetch carousel data:', error));

    // Fetch culinary data from the API
    fetch(API_URLS + '/culinary')
      .then((response) => response.json())
      .then((data) => {
        setCulinaries(
          data.map((item) => ({
            name: item.name,
            imageUrl: item.imageUrl,
            description: item.description, 
            popularLocation: item.popularLocation || 'No location provided'
          }))
        );
      })
      .catch((error) => console.error('Failed to fetch culinary data:', error));
  }, []);

  if (slides.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="carousel">
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={slideIndex === idx ? 'slide slide-active' : 'slide slide-hidden'}
        >
          <img src={slide.src} alt={slide.alt} className="slide-image" />
          <div className="slide-description">
            <h3>{slide.alt}</h3>
            <p>{slide.description}</p>
            <p><strong>Location:</strong> {slide.location}</p>
            {culinaries[idx] && (
              <div className="culinary">
                <h4>Kuliner Recommendation</h4>
                <div className="culinary-content">
                  <img src={culinaries[idx].imageUrl} alt={culinaries[idx].name} className="culinary-image" />
                  <div className="culinary-text">
                    <p><strong>{culinaries[idx].name}</strong></p>
                    <p>{culinaries[idx].description}</p>
                    <p><strong>Popular Location:</strong> {culinaries[idx].popularLocation}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
      </div>
  );
};

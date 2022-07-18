import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import context from '../context/Context';

const FIVE = 5;

function CarouselFadeExample() {
  const { recommended } = useContext(context);
  const [recommendedData, setRecommendedData] = useState();
  const history = useHistory();

  const organizeRecommendedData = () => {
    const datas = [];
    if (history.location.pathname.includes('foods')) {
      for (let index = 0; index <= FIVE; index += 1) {
        datas.push({ imgLink: recommended[index].strDrinkThumb,
          name: recommended[index].strDrink });
      }
    } else {
      for (let index = 0; index <= FIVE; index += 1) {
        datas.push({ imgLink: recommended[index].strMealThumb,
          name: recommended[index].strMeal });
      }
    }
    setRecommendedData([...datas]);
  };

  useEffect(() => {
    if (Array.isArray(recommended) && recommended.length > 0) organizeRecommendedData();
  }, [recommended]);

  return (
    <div>
      {recommendedData && recommendedData.length > 0 && (
        <Carousel fade>
          <Carousel.Item>
            <div
              style={ { display: 'flex' } }
            >
              <img
                data-testid="0-recomendation-card"
                className="d-block w-50"
                src={ recommendedData[0].imgLink }
                alt={ recommendedData[0].name }
              />
              <img
                data-testid="1-recomendation-card"
                className="d-block w-50"
                src={ recommendedData[1].imgLink }
                alt={ recommendedData[1].name }
              />
            </div>
            <Carousel.Caption>
              <p data-testid="0-recomendation-title">{recommendedData[0].name}</p>
              <p data-testid="1-recomendation-title">{recommendedData[1].name}</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={ 2000 }>
            <div
              style={ { display: 'flex' } }
            >
              <img
                data-testid="2-recomendation-card"
                className="d-block w-50"
                src={ recommendedData[2].imgLink }
                alt={ recommendedData[2].name }
              />
              <img
                data-testid="3-recomendation-card"
                className="d-block w-50"
                src={ recommendedData[3].imgLink }
                alt={ recommendedData[3].name }
              />
            </div>
            <Carousel.Caption>
              <p data-testid="2-recomendation-title">{recommendedData[2].name}</p>
              <p data-testid="3-recomendation-title">{recommendedData[3].name}</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={ 2000 }>
            <div
              style={ { display: 'flex' } }
            >
              <img
                data-testid="4-recomendation-card"
                className="d-block w-50"
                src={ recommendedData[4].imgLink }
                alt={ recommendedData[4].name }
              />
              <img
                data-testid="5-recomendation-card"
                className="d-block w-50"
                src={ recommendedData[5].imgLink }
                alt={ recommendedData[5].name }
              />
              <p>{ recommendedData[5].name }</p>
            </div>
            <Carousel.Caption>
              <p data-testid="4-recomendation-title">{recommendedData[4].name}</p>
              <p data-testid="5-recomendation-title">{recommendedData[5].name}</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      )}
    </div>
  );
}

export default CarouselFadeExample;

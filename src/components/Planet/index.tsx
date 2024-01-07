import React, { FC, Fragment, useMemo, useState } from 'react';
import { PlanetInterface } from '../../App';
import classNames from 'classnames';
import DetailsModal from './Details';

interface PlanetProps {
  planet: PlanetInterface;
  weight?: number;
};

const GRAVITATIONAL_ACCELERATION_ON_EARTH = 9.81;

const calculateWeightOnPlanet = (mass: number, gravitationalAcceleration: number) => (mass * gravitationalAcceleration) / GRAVITATIONAL_ACCELERATION_ON_EARTH;

const Planet: FC<PlanetProps> = ({ planet, weight }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpened, setIsOpen] = useState(false);

  const weightOnPlanet = useMemo(
    () => {
      if (!weight) {
        return '...';
      }
      const finalWeight = calculateWeightOnPlanet(weight, planet.gravitationalAcceleration).toFixed(2);

      return `${finalWeight} kg`
    },
    [weight, planet.gravitationalAcceleration],
  );

  return (
    <Fragment>
      <div
        className="w-1/2 md:w-1/4 p-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="border border-slate-700 bg-slate-800 p-4 rounded-3xl">
          <div
            className={
              classNames(
                'relative transition-all duration-500 ease-in-out transform',
                isHovered ? '-mt-24' : '-mt-12',
              )
            }
          >
            <img className="w-full" src={planet.image} alt={planet.name} />
            <div className="flex flex-col md:flex-row items-center">
              <h2 className="text-2xl font-bold flex-1">{planet.name}</h2>
              <p className="font-bold">{weightOnPlanet}</p>
            </div>
          </div>
          <div className="overflow-auto">
            <div
              className={
                classNames(
                  'transition-all duration-500 ease-in-out transform',
                  isHovered ? 'mt-0 opacity-2' : '-mt-20 opacity-0',
                  'h-12'
                )
              }
            >
              <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-3xl w-full mt-2" onClick={() => setIsOpen(true)}>More Info</button>
            </div>
          </div>
        </div>
      </div>
      <DetailsModal isOpen={isOpened} onClose={() => setIsOpen(false)} planet={planet} />
    </Fragment>
  );
};

export default Planet;
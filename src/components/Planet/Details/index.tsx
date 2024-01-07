import React, { FC } from 'react';
import { PlanetInterface } from '../../../App';
import classNames from 'classnames';

const Curiosity: FC<{
  name: string;
  label: string;
  value: string;
  sublabel?: string;
}> = ({ name, label, value, sublabel }) => {
  return (
    <div className="w-1/2 flex gap-4 border-b border-slate-700 mb-4 pb-4">
      <img
        className="w-12 h-12 filter invert"
        src={`/metrics/${name}.png`} alt={name}
      />
      <div className="flex-1">
        <p className="text-sm font-bold">{label}</p>
        <p className="text-lg font-bold">{value}</p>
        <p className="text-sm">{sublabel}</p>
      </div>
    </div>
  )
};

const DetailsModal: FC<{
  isOpen: boolean;
  planet: PlanetInterface;
  onClose: () => void;
}> = ({ isOpen, onClose, planet }) => {
  return (
    <div
      className={
        classNames(
          'fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center transition-all duration-500 ease-in-out transform z-10',
          isOpen ? 'opacity-100' : 'opacity-0 -translate-y-full',
        )
      }
      onClick={onClose}
    >
      <div
        className="bg-slate-900 border border-slate-700 shadow-xl rounded-3xl w-full max-w-screen-md relative"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center flex-col -mt-24">
          <img className="w-1/4" src={planet.image} alt={planet.name} />
          <div>
            <h2 className="text-3xl font-bold">{planet.name}</h2>
          </div>
          <button onClick={onClose} className="absolute left-0 top-0 px-4 py-2 text-sm font-bold m-4">← Go Back</button>
        </div>
        <p className="text-sm mx-8 my-4">{planet.description}</p>
        <div className="mx-8 my-4 flex flex-wrap gap-y-2">
          {
            planet.curiosities.map(curiosity => (
              <Curiosity key={curiosity.name} {...curiosity} />
            ))
          }
        </div>
      </div>
    </div>
  )
};

export default DetailsModal;
import React, { FC, useState } from 'react';
import Planet from './components/Planet';
import { planetsByGravitationalAcceleration } from '../utils';
import classNames from 'classnames';

export interface PlanetInterface {
  id: string;
  name: string;
  description: string;
  gravitationalAcceleration: number;
  image: string;
  curiosities: {
    name: string;
    label: string;
    value: string;
    sublabel?: string;
  }[];
}

const App: FC = () => {
  const [weightOnEarth, setWeightOnEarth] = useState<number | undefined>(70);

  return (
    <div className="bg-slate-900 h-screen w-screen text-white overflow-auto">
      <div className="max-w-screen-xl mx-auto">
        <div className="h-[15vh] flex justify-center flex-col gap-4">
          <label htmlFor="weight" className="text-2xl ml-8">Enter your weight in your planet</label>
          <input
            type="number"
            value={weightOnEarth}
            onChange={e => setWeightOnEarth(Number(e.target.value))}
            placeholder="Enter your weight in your planet"
            id="weight"
            className={
              classNames(
                'w-full bg-transparent text-4xl font-bold outline-none border border-slate-700 rounded-[40px] py-4 px-8',
                'appearance-none w-[93%] mx-auto md:w-full'
              )
            }
          />
        </div>
        <div className="flex gap-y-12 flex-wrap mt-12">
          {
            planetsByGravitationalAcceleration.map(planet => (
              <Planet key={planet.id} planet={planet} weight={weightOnEarth} />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default App;
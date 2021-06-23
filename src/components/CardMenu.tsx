import React, { FC } from 'react';

type Props = {
  activeAsset: string;
  onClick: (value: string) => void;
};

const assets = [
  {
    name: 'Dai (DAI)',
    logo: 'dai.png',
  },
  {
    name: 'USD Coin (USDC)',
    logo: 'usdc.png',
  },
  {
    name: 'Tether (USDT)',
    logo: 'usdt.png',
  },
];
const CardMenu: FC<Props> = ({ onClick, activeAsset }) => {
  return (
    <div className="w-full h-auto flex flex-row justify-between">
      {assets.map((item) => (
        <div
          className={`w-1/3 bg-white cursor-pointer rounded-md m-4 p-5 flex flex-row shadow-md ${
            activeAsset === item.name ? 'bg-white' : 'bg-gray-300'
          }`}
          onClick={()=> onClick(item.name)}
        >
          <img
            src={`/assets/images/${item.logo}`}
            className="w-20"
            alt="coin-logo"
          />
          <h1 className="text-2xl font-semibold ml-5 h-full mt-5">
            {item.name}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default CardMenu;

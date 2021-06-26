import React, { FC } from 'react';

type asset =  {
  name: string
  logo: string
  address : string
}
type Props = {
  activeAsset : asset
  onClick: (value: asset) => void;
};

const assets = [
  {
    name: 'Dai (DAI)',
    logo: 'dai.png',
    address:"0x5d3a536e4d6dbd6114cc1ead35777bab948e3643"
  },
  {
    name: 'USD Coin (USDC)',
    logo: 'usdc.png',
    address:"0x39aa39c021dfbae8fac545936693ac917d5e7563"
  },
  {
    name: 'Tether (USDT)',
    logo: 'usdt.png',
    address:"0xf650c3d88d12db855b8bf7d11be6c55a4e07dcc9"
  },
];
const CardMenu: FC<Props> = ({ onClick, activeAsset }) => {
  return (
    <div className="w-5/5 h-auto flex flex-col pr-4 pt-4">
      {assets.map((item) => (
        <div
          className={`w-full  bg-white cursor-pointer rounded-md m-4 p-5 flex flex-row shadow-md ${
            activeAsset.name === item.name ? 'bg-white' : 'bg-gray-200'
          }`}
          onClick={()=> onClick(item)}
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

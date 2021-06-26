import React, { FC, useEffect, useState } from 'react';
import CardMenu from 'components/CardMenu';
import { Chart, LineAdvance } from 'bizcharts';
const protocols = [
  {
    name: 'Compound',
    logo: 'compound.png',
  },
  {
    name: 'Aave',
    logo: 'aave.png',
  },
];

const menuItems = [
  { label: 'Supply Rates', filter: 'supply' },
  { label: 'Borrow Rates', filter: 'borrow' },
  { label: 'Utilization Rates', filter: 'interest' },
];
const Home = () => {
  const [activeProtocol, setActiveProtocol] = useState('Compound');
  const [activeAsset, setActiveAsset] = useState({
    name: 'Dai (DAI)',
    logo: 'dai.png',
    address: '0x5d3a536e4d6dbd6114cc1ead35777bab948e3643',
  });
  const [newData, setData] = useState([]);

  const [filter, setFilter] = useState({
    borrow: false,
    supply: false,
    interest: false,
  });
  useEffect(() => {
    let today = Math.floor(Date.now() / 1000);
    let weekbefore = today - 86400 * 21;
    fetch(
      `https://api.compound.finance/api/v2/market_history/graph?asset=${activeAsset.address}&min_block_timestamp=${weekbefore}&max_block_timestamp=${today}&num_buckets=21&network=mainnet`
    )
      .then((res) => res.json())
      .then((data) => {
        let final = [];
        if (filter.borrow) {
          final = data.borrow_rates.map((line) => {
            var date = new Date(line.block_timestamp);
            let unix_timestamp = line.block_timestamp;
            // Create a new JavaScript Date object based on the timestamp
            // multiplied by 1000 so that the argument is in milliseconds, not seconds.
            var date = new Date(unix_timestamp * 1000);

            return {
              time: date.getDate() + ' June',
              rate: line.rate * 100,
              name: 'Borrow rate',
            };
          });
        }
        if (filter.supply) {
          let supply = data.supply_rates.map((line) => {
            var date = new Date(line.block_timestamp);
            let unix_timestamp = line.block_timestamp;
            // Create a new JavaScript Date object based on the timestamp
            // multiplied by 1000 so that the argument is in milliseconds, not seconds.
            var date = new Date(unix_timestamp * 1000);

            return {
              time: date.getDate() + ' June',
              rate: line.rate * 100,
              name: 'Supply rate',
            };
          });
          console.log(supply);
          final.push(...supply);
        }

        if (filter.interest) {
          let interest = data.total_supply_history.map((line, index) => {
            var date = new Date(line.block_timestamp);
            let unix_timestamp = line.block_timestamp;
            // Create a new JavaScript Date object based on the timestamp
            // multiplied by 1000 so that the argument is in milliseconds, not seconds.
            var date = new Date(unix_timestamp * 1000);

            return {
              time: date.getDate() + ' June',
              rate:
                parseFloat(line.total.value) /
                parseFloat(data.total_borrows_history[index].total.value),
              name: 'Utilization_rate',
            };
          });
          console.log(interest);
          final.push(...interest);
        }

        setData(final);
      });
  }, [filter, activeAsset, activeProtocol]);
  return (
    <>
      <div className="flex flex-row ">
        <div className="w-2/12 m-4 p-4 h-auto">
          <h1 className="text-4xl font-bold">InterestData</h1>
          <ul className="list-none mt-10">
            {menuItems.map((item) => (
              <li
                className={`text-lg font-semibold mt-4 ml-4 text-gray-400 ${
                  item === 'Borrow Rates' ? 'text-gray-800' : 'text-gray-400'
                }`}
              >
                <input
                  type="checkbox"
                  class="form-checkbox h-5 w-5 text-gray-600"
                  onChange={(e) =>
                    setFilter({ ...filter, [item.filter]: e.target.checked })
                  }
                  checked={filter[`${item.filter}`]}
                />
                <span class="ml-2 text-gray-700">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-10/12 flex-col">
         
          <div className="h-16 w-full  flex flex-row mt-4">
            {protocols.map((p) => (
              <div
                className={`flex flex-row ml-4  w-60 rounded-md cursor-pointer p-3 shadow-md ${
                  activeProtocol === p.name ? 'bg-white' : 'bg-gray-300'
                }`}
                onClick={() => setActiveProtocol(p.name)}
              >
                <img src={`/assets/images/${p.logo}`} alt="protocol" />
                <h1 className="text-2xl font-medium m-1 ml-5">{p.name}</h1>
              </div>
            ))}
          </div>
          <div className="flex flex-row w-full mt-5">
          <CardMenu
            onClick={(item) => {
              setActiveAsset(item);
            }}
            activeAsset={activeAsset}
          />
          {(filter.borrow || filter.supply || filter.interest) &&( activeProtocol === "Compound" && (
            <div className="bg-white m-4 mt-7 p-4 pt-10 shadow-md rounded-md w-4/5">
              <h1 className="text-3xl m-4 ml-7 font-bold text-gray-600">
                DAI Rates
              </h1>
              <Chart
                padding={[10, 20, 50, 40]}
                autoFit
                height={400}
                scale={{
                  rate: filter.interest
                    ? {
                        min: 0,
                      }
                    : {
                        min: 0,
                      },
                }}
                data={newData}
              >
                <LineAdvance
                  shape="smooth"
                  point
                  area
                  position="time*rate"
                  color="name"
                />
              </Chart>
            </div>
          ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

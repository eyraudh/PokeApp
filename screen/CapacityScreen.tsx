import React from 'react';
import { VictoryArea, VictoryChart, VictoryTheme, VictoryPolarAxis } from 'victory-native';

type statProps = { statName: string, value: number };
type capacityProps = { stats: statProps[] };
const CapacityScreen = ({ stats }: capacityProps) => {
  console.log(stats);
  const sampleData =
    stats.map((element) => { return { x: element.statName, y: element.value } });
  return (
    <VictoryChart polar>
      {
        ["attack", "special-attack", "defense", "special-defense", "speed", "hp"].map((d, i) => {
          return (
            <VictoryPolarAxis dependentAxis
              key={i}
              label={d}
              labelPlacement="perpendicular"
              style={{
                axisLabel: { fill: "orange" }
              }}
              axisValue={d}
              domain={{ x: [0, 100], y: [0, 252] }}
            />
          );
        })
      }
      <VictoryArea style={{ data: { fill: "lightblue", fillOpacity: 0.7 } }}
        data={sampleData} />
    </VictoryChart>

  )
    ;
}

export default CapacityScreen
import React from "react";
import styled from "styled-components";
import { ResponsiveLine } from 'nivo'

function TemperatureMonitor(props) {

  return (
    <div style={{height: 500, display: 'flex', flexDirection: 'column', borderRadius: 20, boxShadow: '0px 1px 5px  0.35px #000', marginTop: 20}}>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20}}>
            <text style={{fontFamily: 'roboto-700', fontSize: 20, color: '#1b1717', marginLeft: 30}}>Temperature</text>
            <Image src={require('../assets/images/temperature.png')} style={{height: 50, marginRight: 30}}/>
        </div>    
            <ResponsiveLine
              data={props.data}
              margin={{ top: 50, right: 40, bottom: 120, left: 60 }}
              xScale={{ type: 'point' }}
              yScale={{
                  type: 'linear',
                  min: 'auto',
                  max: 'auto',
                  stacked: true,
                  reverse: false
              }}
              yFormat=" >-.2f"
              axisTop={null}
              axisRight={null}
              axisBottom={{
                  orient: 'bottom',
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
              }}
              axisLeft={{
                  orient: 'left',
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: '°C',
                  legendOffset: -40,
                  legendPosition: 'middle'
              }}
              pointSize={10}
              pointColor={{ theme: 'background' }}
              pointBorderWidth={2}
              pointBorderColor={{ from: 'serieColor' }}
              pointLabelYOffset={-12}
              useMesh={true}
              legends={[
                {
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 100,
                  translateY: 0,
                  itemsSpacing: 0,
                  itemDirection: 'left-to-right',
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: 'circle',
                  symbolBorderColor: 'rgba(0, 0, 0, .5)',
                  effects: [
                          {
                              on: 'hover',
                              style: {
                                  itemBackground: 'rgba(0, 0, 0, .03)',
                                  itemOpacity: 1
                              }
                          }
                      ]
                  }
              ]}
            />
          </div>
  );
}

const Image = styled.img`
`;

export default TemperatureMonitor;

import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import debounce from 'lodash/debounce';
import { Skeleton } from './Skeleton';

const PADDING = 45;

function useResize(ref) {
  const [state, setState] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const getSize = debounce(() => {
      if (!ref || !ref.current) {
        return;
      }

      const parentWidth = window.innerWidth > 700 ? 700 : window.innerWidth;

      const margins = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      };

      const width = parentWidth;
      const height = 300 - margins.top - margins.bottom;

      setState({
        width,
        height,
      });
    }, 1000);

    window.addEventListener('resize', getSize);
    getSize();
    return () => window.removeEventListener('resize', getSize);
  }, [ref]);

  return state;
}

const LineChart = (props) => {
  const [lineData, setLineData] = useState();
  const [markers, setMakers] = useState([]);

  const rootRef = useRef(null);
  const xAxisRef = useRef(null);
  const yAxisRef = useRef(null);
  const size = useResize(rootRef);

  useEffect(() => {
    if (!size || !props.data) {
      return;
    }

    const data = props.data;
    const { width, height } = size;

    const xScale = d3
      .scaleLinear()
      .domain([0, data.length])
      .range([PADDING, width - PADDING]);
    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.y))
      .range([height - PADDING, PADDING]);

    const lineGenerator = d3
      .line()
      .x((d, i) => xScale(i))
      .y((d) => yScale(d.y))
      .curve(d3.curveMonotoneX);

    const xAxis = d3
      .axisBottom()
      .scale(xScale)
      .ticks(Math.round(width / 150));

    const yAxis = d3
      .axisLeft()
      .scale(yScale)
      .ticks(height / 50);

    d3.select(xAxisRef.current).call(xAxis);
    d3.select(yAxisRef.current).call(yAxis);

    var svg = d3.select('svg');
    svg
      .append('text')
      .attr('x', window.innerWidth / 5)
      .attr('y', height + 250)
      .attr('text-anchor', 'middle')
      .style('font-family', 'Helvetica')
      .style('font-size', 11)
      .text('Reviews');

    svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('transform', 'translate(60,' + 140 + ')rotate(-90)')
      .style('font-family', 'Helvetica')
      .attr('y', -40)
      .style('font-size', 11)
      .text('Ratings');

    setLineData(lineGenerator(data));
    setMakers(
      data.map((d, i) => ({
        x: xScale(i),
        y: yScale(d.y),
      })),
    );
  }, [size, props]);

  return (
    <div ref={rootRef}>
      {size.height === 0 && <Skeleton />}
      <div>
        <div className="overflow-hidden rounded-lg shadow-lg">
          {size && (
            <svg width={size.width} height={size.height}>
              <g id="axes">
                <g
                  id="x-axis"
                  ref={xAxisRef}
                  transform={`translate(0, ${size.height - PADDING})`}
                />
                <g
                  id="y-axis"
                  ref={yAxisRef}
                  transform={`translate(${PADDING}, 0)`}
                />
              </g>
              <g id="chart">
                {lineData && (
                  <path stroke="#48bb78" className="chart-line" d={lineData} />
                )}
                {markers &&
                  markers.map((marker, i) => (
                    <circle
                      key={i}
                      cx={marker.x}
                      cy={marker.y}
                      r={4}
                      className="chart-marker"
                    />
                  ))}
              </g>
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default LineChart;

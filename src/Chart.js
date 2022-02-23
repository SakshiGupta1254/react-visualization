import React, { useEffect,useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Paper} from '@material-ui/core';
import Chart from 'react-apexcharts'
import { LineChart, Line, CartesianGrid,Label, XAxis, YAxis,Tooltip,Legend,ResponsiveContainer } from "recharts";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useMutation,
  gql,
} from "@apollo/client";

const useStyles = makeStyles((theme) => ({
  PaperRoot: {
    backgroundColor: "#C1E1C1",
    width: 18,
    margin: 6,
    padding: 5,
  },

  Card: {
    height: 800,
    marginTop:30
  },
  filtersection: {
    color: "green",
    fontSize: "large",
    float: "right",
    display: "inline-flex",
  },
  selected: {
    backgroundColor: "#DBE6E0 !important",
    height: 46,
  },
  fade: {
    height: 46,
  },
  mobileflex: {
    display: "block",
  },
  rightPane: {
    flexBasis: "66%",
    backgroundColor: "#fafafa",
  },
  locationnav: {
    color: "green",
    width: "100%",
  },
  tooltip:{
fontSize:13,
padding:12
  },
  filterMobile: {
    float: "right",
    width: "48%",
  },
  leftPane: {
    width: "30%",
  },
  box:{
    width:300,
    display:'inline-flex'
  }
}));
const testdata = {
          
  series: [{
    name: 'Income',
    type: 'column',
    data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
  }, {
    name: 'Cashflow',
    type: 'column',
    data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5]
  }, {
    name: 'Revenue',
    type: 'line',
    data: [20, 29, 37, 36, 44, 45, 50, 58]
  }],
  options: {
    chart: {
      height: 350,
      type: 'line',
      stacked: false
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: [1, 1, 4]
    },
    title: {
      text: 'XYZ - Stock Analysis (2009 - 2016)',
      align: 'left',
      offsetX: 110
    },
    xaxis: {
      categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
    },
    yaxis: [
      {
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#008FFB'
        },
        labels: {
          style: {
            colors: '#008FFB',
          }
        },
        title: {
          text: "Income (thousand crores)",
          style: {
            color: '#008FFB',
          }
        },
        tooltip: {
          enabled: true
        }
      },
      {
        seriesName: 'Income',
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#00E396'
        },
        labels: {
          style: {
            colors: '#00E396',
          }
        },
        title: {
          text: "Operating Cashflow (thousand crores)",
          style: {
            color: '#00E396',
          }
        },
      },
      {
        seriesName: 'Revenue',
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#FEB019'
        },
        labels: {
          style: {
            colors: '#FEB019',
          },
        },
        title: {
          text: "Revenue (thousand crores)",
          style: {
            color: '#FEB019',
          }
        }
      },
    ],
    tooltip: {
      fixed: {
        enabled: true,
        position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
        offsetY: 30,
        offsetX: 60
      },
    },
    legend: {
      horizontalAlign: 'left',
      offsetX: 40
    }
  },
}

const client = new ApolloClient({
  uri: "https://react.eogresources.com/graphql",
  cache: new InMemoryCache(),
});

export default function MetricChart(props) {
  const classes = useStyles();
  const { metricType,timestamp,metriclist } = props;
  const [tempratures,setTempratures] = useState();

  // const METRIC_DETAILS = gql`
  //   query($details:MeasurementQuery!) {
  //     getMeasurements(input: $details) {
        
  //         at
  //         metric
  //         unit
  //         value
        
  //     }
  //   }
  // `;
    const METRIC_DETAILS = gql`
    query($metriclist:[MeasurementQuery]!) {
      getMultipleMeasurements(input: $metriclist) {
        metric
        measurements{
          metric,
          at,
          value,
          unit
        }}
    }
  `;
  const { loading, error, data } = useQuery(METRIC_DETAILS, {
    variables: { details:{metricName : metricType,
    after: timestamp},metriclist },
  });
  const renderCustomAxisTick = ({ x, y, payload }) => {
    return (
      <div>{new Date().toISOString()}</div>
    );
  };
  function CustomTooltip({ payload, label, active }) {
    if (active &&payload) {
      return (
        <Paper  className={classes.tooltip}>
          <p className="label">{`${payload[0]?.payload.metric} : ${payload[0].value}`}</p>
         
          <p className="desc">{new  Date(payload[0]?.payload.at).toString()}</p>
        </Paper>
      );
    }
  
    return null;
  }
  const CustomizedAxisTick = ({x, y, stroke, payload})=> {
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fontSize="12"  fill="#666">
          {`${new Date(payload.value).getHours()}:${new Date(payload.value).getMinutes()}`}
        </text>
      </g>
    );
  }
  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <p>Error :(</p>
    );
  return (
    <div className={classes.Card}>
     
     <ResponsiveContainer>
 <LineChart  width={800}
          height={400} 
  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
    {data.getMultipleMeasurements.map((i,key)=>{
      return(<>
      <Line key={key}  data={i?.measurements} dataKey="value" stroke={key% 2 == 0?'red':'blue'} />
      <YAxis yAxisId={key} label={i?.measurements[0].unit} dataKey="value" unit={i?.measurements[0].unit} tickCount={50} tick={{ fontSize: 10 }}/>
      
      </>)
    })}
   
  <XAxis dataKey="at" tick={<CustomizedAxisTick />} />
  <Tooltip content={<CustomTooltip />}/>
  <Legend />

</LineChart>
</ResponsiveContainer>
    </div>
  );
}


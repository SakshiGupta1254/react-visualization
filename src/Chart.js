import React, { useEffect,useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Paper} from '@material-ui/core';
import { LineChart, Line, CartesianGrid, XAxis, YAxis,Tooltip,Legend,ResponsiveContainer } from "recharts";
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

const client = new ApolloClient({
  uri: "https://react.eogresources.com/graphql",
  cache: new InMemoryCache(),
});

export default function Chart(props) {
  const classes = useStyles();
  const { metricType,timestamp } = props;
  const [tempratures,setTempratures] = useState();

  const METRIC_DETAILS = gql`
    query($details:MeasurementQuery!) {
      getMeasurements(input: $details) {
        
          at
          metric
          unit
          value
        
      }
    }
  `;
  const { loading, error, data } = useQuery(METRIC_DETAILS, {
    variables: { details:{metricName : metricType,
    after: timestamp} },
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
  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <p>Error :(</p>
    );
  return (
    <div className={classes.Card}>
     <ResponsiveContainer>
 <LineChart  width={800}
          height={400} data={data?.getMeasurements}
  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
  
  <Line type="monotone" dataKey="value" stroke="#8884d8" />
  <XAxis />
  <YAxis unit={data?.getMeasurements?.[0]?.unit}/>
  <Tooltip content={<CustomTooltip />}/>
  <Legend />

</LineChart>
</ResponsiveContainer>
    </div>
  );
}


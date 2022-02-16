import React, { useEffect, useState, createContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";


const useStyles = makeStyles((theme) => ({
  PaperRoot: {
    backgroundColor: "#C1E1C1",
    width: 18,
    margin: 6,
    padding: 5
  },

  filter: {
    height: 35,
    padding: 20,
    fontWeight: 500,
    fontSize: 'x-large'
  },
  filtersection: {
    color: 'green',
    fontSize: 'large',
    float: 'right',
    display: "inline-flex"
  },
  selected: {
    backgroundColor: "#DBE6E0 !important",
    height: 46
  },
  fade: {
    height: 46
  },
  mobileflex: {
    display: 'block'
  },
  rightPane: {
    flexBasis: "66%",
    backgroundColor: '#fafafa'
  },
  locationnav:{
color:'green',
width:'100%'
  },
  filterMobile:{
float:'right',
width:'48%'
  },
  leftPane: {
    width: '30%',
  },
  flexdiv: {
    display: 'flex'
  },
  flexCards: {
    display: 'flex',
    justifyContent: "space-between",
    margin: 20,

  },
  Chip: {
    float:'left',
    position: 'relative',
    backgroundColor: 'green',
    color: 'white'
  }
}))

const client = new ApolloClient({
  uri: 'https://react.eogresources.com/graphql',
  cache: new InMemoryCache(),
});
const METRIC_DETAILS = gql`
  query($metricType:String!) {
    getMultipleMeasurements(input:{
        metricName: $metricType
    }){metric
        measurements {
            at
            metric
            unit
            value
        }

    }
  }
`;
 function Chart(props) {
     const {metricType} = props;
console.log(metricType,props);
const { loading, error, data } = useQuery(METRIC_DETAILS,{variables:{metricType},});
const testdata = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];
const handleFilterLocation = () =>{

}

  if (loading) return <p>Loading...</p>;
  if (error) return <p>  <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
  <Line type="monotone" dataKey="uv" stroke="#8884d8" />
  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
  <XAxis dataKey="name" />
  <YAxis />
</LineChart></p>;
  return (
  <div>
 <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="name" />
    <YAxis />
  </LineChart>
  </div>


  )
}
export default(props) => (
  <ApolloProvider client={client}>
    <Chart />
  </ApolloProvider>
);

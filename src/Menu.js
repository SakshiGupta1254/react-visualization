import React, { useEffect, useState, createContext } from "react";
import Location from "./Location";
import { makeStyles } from "@material-ui/core/styles";
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
const EXCHANGE_RATES = gql`
  query {
    getMetrics
    heartBeat
  }
`;
 function Menu() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);
const handleFilterLocation = () =>{

}

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
  <div>
    <Location locationData={data.getMetrics} timestamp={data.heartBeat} handleFilterLocation={handleFilterLocation}/>
  </div>


  )
}
export default() => (
  <ApolloProvider client={client}>
    <Menu />
  </ApolloProvider>
);

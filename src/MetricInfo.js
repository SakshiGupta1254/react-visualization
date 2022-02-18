import React,{useEffect, useState} from 'react' ;
import {Paper,List,ListItemText,ListItem,Divider, Typography,Select,OutlinedInput,
  Chip,MenuItem,Box} from '@material-ui/core';
  import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    useMutation,
    gql,
  } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import Chart from "./Chart"

const useStyles = makeStyles((theme) => ({
    Paper: {
      padding:15
    },}));   

export default function MetricInfo(props) {
    const classes = useStyles();
  const [Temp, setTemp] = useState([]);
    const{name} =props;
    const METRIC_POPUP = gql`
    query($name : String!) {
        getLastKnownMeasurement(metricName: $name) {
            value
        }
    }
  `;
    const { loading, error, data } = useQuery(METRIC_POPUP, {
        variables: { name },pollInterval: 500,
      });
   
  return(<><div >
      <Paper className={classes.Paper}>
 <pre>{name}</pre>
 <div>{data?.getLastKnownMeasurement?.value}</div>
 </Paper>
  </div>
        </>)
}  
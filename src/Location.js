import React,{useEffect, useState} from 'react' ;
import {Paper,List,ListItemText,ListItem,Divider, Typography,Select,OutlinedInput,
  Chip,MenuItem,Box} from '@material-ui/core';
import { ChevronRight, ExpandMore, Close as CloseIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import MetricInfo from './MetricInfo';
import MetricChart from "./Chart"
const useStyles = makeStyles((theme) => ({
    PaperRoot: {
      backgroundColor: "#C1E1C1",
      width:18,
      margin:6,
      padding:5
    },

    filter:{
        height:35,
        padding:20,
        fontWeight:500,
        fontSize:'x-large'
    },
    box:{
      float:'right',
      width: 370,
      height:50,
      margin:5
    },
    filtersection:{
        color:'green',
       fontSize:'large',
       float:'right',
        display:"inline-flex"
    },
    selected :{
        backgroundColor: "#DBE6E0 !important",
        height:46
    },
    fade:{
        height:46
    },
    rightPane: {
        flexBasis: "66%",
        backgroundColor:'#fafafa'
      },
      leftPane:{
        width:'30%',
      },
      flexdiv: {
          display: 'flex'
      },
      flexCards:{
          display: 'flex',
          justifyContent:"space-between",
          margin:20,
         
      },
      Chip:{
        position:'relative',
        color:'black',
        borderRadius:0,
        margin: 2,
        height: 25
      },
      FadeChip:{
        left:'35%',
        position:'relative',
        backgroundColor:'green',
        color:'white'
      },
      ActiveChip:{
        color:'green',
        left:'35%',
        position:'relative',
      },
      CardUi:{
        width: '32%',
        textAlign:'center',

        boxShadow:"0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19) !important"
      }
    })) 
     

export default function Location(props) {
  const [Temp, setTemp] = useState([]);
    const{locationData,timestamp, selected, hoverActions, filterLocation, handleFilterLocation} =props;
    const classes = useStyles();
    const handleChange = (event) => {
      setTemp(event.target.value);
      
    };
    const handleDelete =() =>{
      debugger
    }
   
  return(<><div className={classes.filter}>
   <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          label="select"
          value={Temp}
          onChange={handleChange}
          input={<OutlinedInput className={classes.box} label="Select" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip className={classes.Chip} onDelete={handleChange} key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {locationData.map((name) => (
            <MenuItem
              key={name}
              value={name}
            
            >
              {name}
            </MenuItem>
          ))}
        </Select>
        
        {Temp&& Temp.map(i=> {
        return(<div className={classes.box}>
          <MetricInfo name={i}/>
          </div>)
      }

      )}
       { Temp.length>0? Temp.map(i=>(<MetricChart timestamp={timestamp} metricType={i}/>)):""}
  </div>
        </>)
}  
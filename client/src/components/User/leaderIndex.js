//import { onValue } from 'firebase/database';
import React from 'react';
import {db} from '../../firebase';
import {ref,onValue} from 'firebase/database'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


class GeneralMarketInfo extends React.Component{
  constructor(){
    super();
    this.state={
      tableData: []
    }
  }
  componentDidMount()
  {
    const dbRef=ref(db,"10zzyNfnzaHiwsdWOk7v987lutCdIxIE7Yw91L7QEfhc/Sensex");
    onValue(dbRef,(snapshot)=>{
      let recrods=[];
      snapshot.forEach(childSnapshot=>{
        let keyName=childSnapshot.key;
        let data=childSnapshot.val();
       // console.log(snapshot.val());

        recrods.push({"key":keyName,"data":data})
        console.log(recrods[recrods.length-1])
      });
      this.setState({tableData:recrods});
    })

  }
  
  render(){
    return(
      <div>
{this.state.tableData.map((row, index)=>{
return(

<Box component="span" sx={{}}>
<Grid > {row.data.leaderIndex}</Grid>
<Grid sx={{color:row.data.leadingWith<0 ? 'red' : 'green',  fontSize:17}}>{row.data.leadingWith}% {row.data.leadingWith > 0 ? <ArrowUpwardIcon style={{ color: "green" }} /> : <ArrowDownwardIcon fontSize="medium" style={{ color: "red", height: "100%" }} />}
today </Grid>

</Box>

)
})}
</div>
    )
  }
}

export default GeneralMarketInfo;
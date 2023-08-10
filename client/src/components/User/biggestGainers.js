import React from 'react';
import axios from 'axios';
import { Grid} from '@mui/material';
import Table from '@mui/material/Table';
import { Box, TableBody, TableCell, TableContainer, TableHead,TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

class TableGen extends React.Component {
  constructor() {
    super();
    this.state = {
      tableData: []
    };
  }
  componentDidMount() {
    const res = axios
      .post(
        'https://us-central1-stockmarketcharting-8c469.cloudfunctions.net/server/performance/getbest'
      )
      .then((res) => {
        this.setState({ tableData: res.data });      })
      
  }
render(){

  const StyledLink = styled(Link)(() => ({
textDecoration:'none'    
  }));
 
  return(
    <div>
<Box  sx={{ flexGrow: 3 }} display="flex"
  justifyContent="center"
  alignItems="center"marginLeft={2.5} marginRight={1}  mt={2.5}>
      <Grid container spacing={{ xs: 1, md: 1,lg:2}} columns={{ xs: 0.3, sm: 0.3, md: 12 ,lg:16}} display="flex"
  justifyContent="center"
  alignItems="center" >
<TableContainer style={{width:600,height:400}}> 
<Table style={{ border: "2px solid #808080"}} sx={{alignItems: "center",}}>

    <TableHead sx={{backgroundColor: "rgba(75,192,192,1)",fontWeight: 'bold', color:"FFF"}}>
        <TableRow>
            <TableCell  align="center"> Name </TableCell>
            <TableCell  align="center"> Change </TableCell>
            <TableCell  align="center"> Sector </TableCell>
        </TableRow>
    </TableHead>
    <TableBody style={{border: "2px solid #808080", borderBottom: "2px solid #808080", borderRadius: "15px"}} sx={{alignItems: "center",}}>
        {this.state.tableData.length!=0 && this.state.tableData.map((row, index)=>{
              //console.log(row)
            return(
                <TableRow key={index} style={{border: "2px solid #808080"}} sx={{alignItems: "center",}}>
                    {row.changepct>0 ? <TableCell  align="center" style={{borderBottom:"none"}}  > {row.name} <Box></Box> </TableCell>:<Box></Box>}
                   {row.changepct>0 ? <TableCell sx={{color:row.changepct<0 ? 'red' : 'green',}} align="center" style={{borderBottom:"none"}}> {row.changepct?row.changepct.toFixed(2):row.changepct} %  <Box></Box> </TableCell>:<Box></Box>}
                    {row.changepct>0 ? <TableCell  align="center" style={{borderBottom:"none"}} > {row.sector}  <Box></Box></TableCell>:<Box ></Box>}

                </TableRow>
            )
        })}
    </TableBody>
    </Table>
</TableContainer>
</Grid>

</Box>

</div>
  )
}
}

export default TableGen;
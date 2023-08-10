import * as React from 'react';
import  {useState} from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import BasicDatePicker from './basicdatepicker';
import Country from './countr.js';


  export default function EditProfile(){

 
  const [name, setName] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [gender, setGender]= useState('')
  const [address3, setAddress3] = useState('')
  const [address4, setAddress4] = useState('')
  const [address5, setAddress5] = useState('')
  const [phoneNo, setPhoneno] = useState('')
  


  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('name',name);
    formData.set('address1',address1);
    formData.set('address2',address2);
    formData.set('gender',gender);
    formData.set('address3',address3);
    formData.set('address4',address4);
    formData.set('address5',address5);
    formData.set('phoneno',phoneNo);

  };

  return (
    <Container component="main" maxWidth="md" >
      <CssBaseline />
      <Box
        sx={{
          width:850,
          marginTop: 4,
          display: 'flex',
          justifyContent:'center',
          flexDirection: 'column',
          alignItems: 'center',
          background: 'white',
          padding: 5
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: '#282A37' }}>
          <PersonIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit Profile
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 3 ,
            width: 600,
        }}
        >
          <Grid className="grid" container spacing={2}>
            
          <Grid item xs={6} >
              <TextField
                name="name"
                required
                fullWidth
                id="name"
                label="Name : "
                variant="filled"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>

           

            <Grid item xs={6} >
              <TextField
                name="address1"
                required
                fullWidth
                id="address"
                label="Address: (Line 1) "
                variant="filled"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                name="gender"
                required
                fullWidth
                label="Gender"
                variant="filled"
                value={gender}
                autoFocus
                onChange={(e) => setGender(e.target.value)}
              />
               
            </Grid> 
          

            <Grid item xs={6}>
              <TextField
                name="address2"
                required
                fullWidth
                label="(Line 2)"
                variant="filled"
                 value={address2}
                autoFocus
            
                onChange={(e) => setAddress2(e.target.value)}
              />
             
            </Grid>   
           

            <Grid item xs={6}>
            <BasicDatePicker/>
          </Grid>

            <Grid item xs={6}>
            <Country/>
          </Grid>
         
          <Grid item xs={6}>
              <TextField
                name="phoneNo"
                required
                fullWidth
                id="phoneNo"
                label="Phone No."
                variant="filled"
                autoFocus
                value={phoneNo}
                onChange={(e) => setPhoneno(e.target.value)}
              />
            
            </Grid>
          <Grid item xs={6} sm={6}>
              <TextField
                name="address3"
                required
                fullWidth
                label="State"
                variant="filled"
                autoFocus
                 value={address3}
                onChange={(e) => setAddress3(e.target.value)}
              />
             
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="address4"
                required
                fullWidth
                label="Pincode"
                variant="filled"
                autoFocus
              
                 value={address4}
              
                onChange={(e) => setAddress4(e.target.value)}
              />
          

            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                name="address5"
                required
                fullWidth
                label="City"
                variant="filled"
                autoFocus
                
                 value={address5}
                
                onChange={(e) => setAddress5(e.target.value)}
              />
              

            </Grid>
          

            

       
          <Grid item xs={4}>
            </Grid>
            
          <Grid item xs={4}>

          <Button
            type="submit"
            fullWidth
            variant="contained"
           
            sx={{ mt: 2,borderRadius: '30px'}}
            onClick={handleSubmit}
          >
            Save
          </Button>
            </Grid>
          
         
          </Grid>
        </Box>

      </Box>

    </Container>
  );
}





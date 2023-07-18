import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Product from './Product';

function Login (){
    const navigate = useNavigate()
    const MySwal = withReactContent(Swal)
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
    
      const handleSubmit = (event) => {
        event.preventDefault();
        var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "username": inputs.username,
  "password": inputs.password
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://localhost:7087/Login", requestOptions)
  .then(response => response.json())
  .then(result => {
    if(result.value === 'Success'){
        MySwal.fire({
            title: <strong>Login Success</strong>,
            html: <i>You clicked the button!</i>,
            icon: 'success'
          }).then((value) =>{
            localStorage.setItem('token', result.serializerSettings.accessToken)
            console.log(localStorage)
            navigate('product')
          })
    } else if (result.value === 'Failed'){
        MySwal.fire({
            title: <strong>Login Failed</strong>,
            html: <i>You clicked the button!</i>,
            icon: 'error'
          })
    }

  })
  .catch(error => console.log('error', error));
        console.log(inputs)
        // alert(inputs);
      }

    return(
        <div>
                  <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login 5555
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={inputs.username || ""} 
        onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={inputs.password || ""} 
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Register"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
                       </div>
    )
}
export default Login;

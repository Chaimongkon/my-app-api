import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Grid, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';

export default function ProductAdd() {
    const productsubmit = event => {
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "name": pname,
          "description": dname,
          "quantity": quantity,
          "price": price
        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("http://localhost:7087/api/Product/Products", requestOptions)
          .then(response => response.json())
          .then(result => {
            alert("เพิ่มข้อมูลเรียบร้อยแล้วจ้า");
            if (result['price'] > '0'){
                window.location.href = '/'
            }
          })
          .catch(error => console.log('error', error));
    }
    const [pname, setPname] = useState("");
    const [dname, setDname] = useState("");
    const [quantity, setQuantity] = useState("0");
    const [price, setPrices] = useState("0");
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="xl" sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                    ADD Product
                </Typography>
                <form onSubmit={productsubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField id="pname" label="Product Name" variant="outlined" fullWidth required onChange={(e) => setPname(e.target.value)} />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField id="dname" label="Description" variant="outlined" fullWidth required onChange={(e) => setDname(e.target.value)} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField id="quantity" label="Quantity" variant="outlined" fullWidth required onChange={(e) => setQuantity(e.target.value)} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField id="price" label="Prices" variant="outlined" fullWidth required onChange={(e) => setPrices(e.target.value)} />
                        </Grid>
                        <Grid item xs={12} >
                            <Button type="submit" variant="contained" fullWidth>ADD Product</Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </React.Fragment>
    );
}
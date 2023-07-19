import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Grid, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';

export default function ProductUpdate() {
    const { id } = useParams();

    useEffect(() => {
        const token = localStorage.getItem('token')
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://localhost:7087/api/Product/Product/72", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result['statusCode'] === 200) {
                    setPname(result['value']['name'])
                    setDname(result['value']['description'])
                    setQuantity(result['value']['quantity'])
                    setPrices(result['value']['price'])
                }
            })
            .catch(error => console.log('error', error));
    }, [id])
    const productsubmit = event => {
        event.preventDefault();
        const token = localStorage.getItem('token')
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);


        var raw = JSON.stringify({
            "id": id,
            "name": pname,
            "description": dname,
            "quantity": quantity,
            "price": price
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://localhost:7087/api/Product/Product/" + id, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                alert("แก้ไขข้อมูลเรียบร้อยแล้วจ้า");
                if (result['statusCode'] === 200) {
                    window.location.href = '../product'
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
                    Update Product
                </Typography>
                <form onSubmit={productsubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField id="pname" label="Product Name" variant="outlined" fullWidth required onChange={(e) => setPname(e.target.value)} value={pname} />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField id="dname" label="Description" variant="outlined" fullWidth required onChange={(e) => setDname(e.target.value)} value={dname} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField id="quantity" label="Quantity" variant="outlined" fullWidth required onChange={(e) => setQuantity(e.target.value)} value={quantity} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField id="price" label="Prices" variant="outlined" fullWidth required onChange={(e) => setPrices(e.target.value)} value={price} />
                        </Grid>
                        <Grid item xs={12} >
                            <Button type="submit" variant="contained" fullWidth>Update Product</Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </React.Fragment>
    );
}
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid,Checkbox,FormGroup,FormControlLabel,Box,TextField, Button} from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import {useHistory} from 'react-router-dom';
import { postProduct } from '../../../redux/products/thunks';
import { makeStyles } from "@material-ui/core/styles";
import { openModal } from '../../../redux/modal/modalSlice';
import { selectProductLoadigCreate } from '../../../redux/products/selector';
import { CircularProgress } from '@mui/material';

const useStyles = makeStyles({
    root: {
        '& label.Mui-focused': {
          color: '#112D4E',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#3F72AF',
          },
          '&:hover fieldset': {
            borderColor: '#112D4E',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#112D4E',
          },
        },
      },
});

export default function ProductForm(){
    const classes = useStyles();
    const dispatch = useDispatch();
    let history = useHistory();
    const loadingCreate = useSelector(selectProductLoadigCreate);

    const [product, setProduct] = React.useState({
        name: '',
        description: '',
        price: '',
        stock: true,
        img:null,
        errors: {} 
    });

    const [fileName,setFileName] = React.useState('')

    const handleChange = (prop) => (event) => {
        
        let value = prop === 'stock' ? event.target.checked : event.target.value;
        setProduct({ ...product, [prop]: value, errors:{...product.errors,[prop]:null}});
    };

    function getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }
      

    let handleChangeFile = (file) => {
        let fileAux = file;
        getBase64(file).then(
            data =>{ 
                setFileName(fileAux.name);
                setProduct({ ...product, 'img': data })
            }
        );
    }


    async function handleSubmitForm  (event) {
        if (product.name === null || product.name === '' ) {
            setProduct({...product, errors:{...product.errors, name:'Por favor introduce el nombre'}});
        }
        else if ((product.price === null || product.price === '') || product.price < 0.00 ||  isNaN(product.price)) {
            let message = (product.price === null || product.price === '') ? 'Por favor introduce un precio' : 
            product.price < 0.00  ? 'El precio no puede ser negativo' : 'Precio no válido.';
            setProduct({...product, errors:{...product.errors, price:message}});
        }
        else {
            dispatch(postProduct(product)).then(unwrapResult).then((data)=>{
                dispatch(openModal({type:'success',message:'Se ha añadido el producto correctamente.'}));
                history.push("/products"); 
            }).catch((error) => {
                dispatch(openModal({type:'error',message:'Se ha producido un error.'}));
            })
        }
    }

    const handleBlurPrice = (event) => {
        let num = parseFloat(product.price);
        let cleanNum = num.toFixed(2);
        setProduct({...product, price: cleanNum});
    }

    return (
        <Grid container justifyContent="center">
            <Grid className="containerForm" item xs={10} sm={10} md={8} lg={3}>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                >
                    <h3>Alta de producto</h3>
                    <div >
                        <TextField
                            error={!!product.errors.name}
                            className={`formInputs ${classes.root}`}
                            required
                            id="name"
                            label="Nombre"
                            inputProps={{
                                maxLength: 50,
                            }}
                            fullWidth={true}
                            helperText={product.errors.name && product.errors.name }
                            onChange={handleChange('name')}
                        />
                    </div>

                    <div>
                        <TextField
                            className={`formInputs ${classes.root}`}
                            fullWidth={true}
                            inputProps={{
                                maxLength: 250,
                            }}
                            id="description"
                            label="Descripción"
                            multiline
                            rows={4}
                            onChange={handleChange('description')}
                        />
                    </div>
                    <div style={{textAlign:'left'}}>
                        <TextField 
                            error={!!product.errors.price}
                            className={`formInputs ${classes.root}`}
                            id="price"
                            required
                            value={product.price}
                            label="Precio"
                            type="number"
                            onBlur={handleBlurPrice}
                            InputProps={{ inputProps: { min: 0.00 } }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            helperText={product.errors.price && product.errors.price }
                            onChange={handleChange('price')}
                        />
                    </div>
                    <div style={{width: '100px'}}> 
                        <FormGroup>
                            <FormControlLabel control={
                                <Checkbox 
                                    defaultChecked 
                                    sx={{color: "#3F72AF", '&.Mui-checked': {color: "#3F72AF",},}}/>} 
                                    id="stock"
                                    label="Stock" 
                                    onChange={handleChange('stock')}
                                />
                        </FormGroup>
                    </div>
                    <div className="uploadImageContainer">
                        <Button variant="contained" component="label" className="uploadImageButton">
                            Subir imagen
                            <input accept="image/*" 
                            onChange={(e)=> handleChangeFile(e.target.files[0])} type="file" hidden/>
                        </Button>
                        <span> {fileName}</span>
                    </div>

                    <div>
                        <Button disabled={ loadingCreate === 'loading'} variant="contained" className="createButton" fullWidth={true} onClick={handleSubmitForm}>
                        { loadingCreate !== 'loading' ? '' : <CircularProgress className="laodingProgress"  size={25}/>} 
                        Crear producto
                        </Button>
                    </div>
                 </Box>
            </Grid>
        </Grid>
    )
}
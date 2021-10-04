
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { makeStyles } from "@material-ui/core/styles";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const useStyles = makeStyles({
    root: {
      
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#3F72AF",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#112D4E",
          borderWidth: 2
        },
        "&.Mui-focused": {
            color: '#112D4E !important'
        },
        "&.MuiInputLabel-root": {
            color: "#3F72AF"
        }
       
    }
  });

export default function ProductSelect(props) {
    const [productName, setProductName] = React.useState([]);
    const classes = useStyles();

    const handleChange = (event) => {
    const {
        target: { value },
    } = event;
    setProductName(
        typeof value === 'string' ? value.split(',') : value,
    );
    };

  
    return (
    <div style={{textAlign:'left',marginBottom:'10px'}}>
        <FormControl sx={{ m: 0, width: {
            xs: '100%',
            sm: 300,
            md: 300, 
            lg: 400,
        
        }, }}>
        <InputLabel className={classes.root} id="products">Productos</InputLabel>
        <Select
            labelId="products"
            id="products-checkbox"
            multiple
            disabled={props.products === null || props.products.length === 0}
            value={productName}
            onChange={handleChange}
            input={<OutlinedInput label="Productos" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
            className={classes.root}
        >
            {props.products.map((product) => (
            <MenuItem key={product._id} value={product.name}>
                <Checkbox sx={{color: "#3F72AF", '&.Mui-checked': {color: "#3F72AF",},}} checked={productName.indexOf(product.name) > -1} />
                <ListItemText primary={product.name} />
            </MenuItem>
            ))}
        </Select>
        </FormControl>
        <FormControl sx={{ ml: { xs:0,  sm: 1, md:1, lg:1}, mt: {xs:1.5,sm:0,md:0}, width: {
            xs: '50%',
            sm: 200,
            md: 200, 
            lg: 200,
        
        },}}>
        <InputLabel className={classes.root} id="orderBy">Ordenar por</InputLabel>
        <Select
            labelId="orderBy"
            id="orderBy"
            defaultValue=""
            className={classes.root}
            label="Ordenar por"
            disabled={props.products === null || props.products.length === 0}
        >
            <MenuItem value="">
                <em>Nada</em>
            </MenuItem>
            <MenuItem  value='name'>Nombre</MenuItem>
            <MenuItem  value='description'>Descripción</MenuItem>
            <MenuItem  value='price'>Precio</MenuItem>
            <MenuItem  value='stock'>En stock</MenuItem>
        </Select> 
        </FormControl>
    </div>
    );
}

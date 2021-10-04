import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Example from '../../../assets/example.png';
import Fab from '@mui/material/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router';
import { getAllProducts } from '../../../redux/products/thunks';
import { selectProducts} from '../../../redux/products/selector';
import { withWidth,isWidthUp } from '@material-ui/core';
import { Cancel,CheckCircle} from '@material-ui/icons';
import ProductSelect from './ProductSelect';
import ErrorComponent from '../../common/ErrorComponent';

 function ProductList(props){
    const history = useHistory();
    const dispath = useDispatch();
    const selector = useSelector(selectProducts)

    const handleRedirectAddProduct = (event) => {
        event.preventDefault();
        history.push("/products/create");
    }

    React.useEffect( () =>{
        dispath(getAllProducts());
    },[dispath]);

    function getCols(screenWidth) {
      if (isWidthUp('lg', screenWidth)) {
        return 4;
      }

      if (isWidthUp('md', screenWidth)) {
        return 3;
      }

      return 2;
    }

    const cols = getCols(props.width) 

    return (
    <> 
        <ProductSelect products={selector}></ProductSelect>
        
        { selector !== null && selector.length > 0 ?
            <>
                <div className="numberProductsContainer">
                    <em> Hay {selector.length} productos </em>
                </div>
                <ImageList gap={5} style={{marginTop:'0px',position:'relative'}} cols={cols}>
                    {selector.map((item) => (
                        <ImageListItem  className='pointer ' key={item._id}>
                            <img
                                src={`${item.img == null ? Example : item.img}`}
                                srcSet={`${item.img == null ? Example : item.img}`}
                                alt={item.name}
                                loading="lazy"
                            />
                            { item.stock ? <CheckCircle className="stock" /> : <Cancel color="error" className="stock"/>}
                            <ImageListItemBar
                                className='itemBar'
                                title={<b>{item.name}</b>}
                                subtitle={<><span>{item.description}</span><br/><br/>
                                            <span className='price'>{item.price} €</span></>}
                                position="below"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </>
            : <ErrorComponent text="No hay productos disponibles actualmente"></ErrorComponent>
            
           
        }
        <Fab onClick={handleRedirectAddProduct} className="addButtom" aria-label="add">
            <AddIcon />
        </Fab>
  
    </>
    )
}

export default withWidth()(ProductList)

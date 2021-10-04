import './App.scss';
import {BrowserRouter as Router, Switch, Route,Redirect} from 'react-router-dom'
import Header from './components/common/Header';
import ProductList from './components/products/productList/ProductList';
import ProductForm from './components/products/productForm/ProductForm';
import ErrorComponent from './components/common/ErrorComponent';
import { Modal } from './components/common/Modal';

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Modal/>
        <Switch>
          <Route exact path="/"  component={() => <Redirect to="/products" />} />
          <Route path="/products/create" component={ ()=> <ProductForm/> }/>
          <Route path="/products" component={ ()=> <ProductList/>} />
          <Route component = {  ()=> <ErrorComponent text="La ruta actual no existe" /> } />
        </Switch> 
      </div>
      
    </Router>
  );
}

export default App;

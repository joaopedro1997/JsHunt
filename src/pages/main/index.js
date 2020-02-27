import React, { Component } from 'react';
import api from '../../services/api'
import { Link } from 'react-router-dom';



import './styles.css'

export default class Main extends Component{

    state = {
        products: [],
        productInfo: {},
        page: 1,

    }

    // sempre que a gente precisar executar 
    // uma ação logo que o componente é exibido em tela
    // é interessanete usar o componentDidMount() 

    componentDidMount(){ 
        this.loadProducts();
    }
    
    loadProducts = async(page = 1)  =>{
        const response = await api.get(`/products?page=${page}`);

        const { docs, ...productInfo } = response.data;

        this.setState({ products: docs, productInfo, page });
    };

    // nota: sempre que a gente tiver uma variavel no estado o nosso metodo render vai ficar escutando a alteração dessa variavel 
    //  e sempre que alguma varivel do estado alterar o método render executa denovo trazendo as alterações em tela 

    prevPage = () =>{
        const { page, productInfo} = this.state;

        if (page === 1) return;
        
        const pageNumber = page - 1
       
        this.loadProducts(pageNumber);
    }

    nextPage = () =>{
        const { page, productInfo} = this.state;

        if (page === productInfo.pages) return;

        const pageNumber = page + 1;

        this.loadProducts(pageNumber)
    }

    render() {
        const { product, page, productInfo } = this.state
        console.log(this.state.products)
        
    return(
        <div className="product-list">
            {this.state.products.map(product => (
                <article  key={product._id}>
                    <strong >{product.title}</strong>
                    <p>{product.description}</p>

                    <Link to={`/products/${product._id}`}>Acessar</Link>
                </article>    
            ))}
            <div className="actions">
                <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                <button disabled={page === productInfo.pages} onClick={this.nextPage}>Próxima</button>
            </div>
        </div>
    )

    }
}
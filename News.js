import React, { Component } from "react";

import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';

export class News extends Component {

  static defaultProps={
      country:'in',
      pageSize:8,
      category:'general',
  }

  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category: PropTypes.string,
    
    
    
  }


    constructor(){
        super();
            this.state={
                articles:[] ,
                loading:false,
                page:1
            }
    }

   async componentDidMount(){
            
            let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a9f5f7be01024e58bbcd7cf5f3dcfaa6&page=1&pageSize=${this.props.pageSize} `;
            this.setState({loading:true});
            let data = await fetch(url);
            let parsedData= await data.json();    
            console.log(parsedData);
            this.setState({articles: parsedData.articles ,
              totalResults:parsedData.totalResults,
              loading: false  
  })
    }

    handleBackClick= async ()=>{
        console.log("back")
        
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a9f5f7be01024e58bbcd7cf5f3dcfaa6&page=${this.state.page-1}&pageSize=${this.props.pageSize}`; 
            this.setState({loading:true});
            let data = await fetch(url);
            let parsedData= await data.json();    
            console.log(parsedData);
            this.setState({
            page:this.state.page-1,
            articles: parsedData.articles, 
            loading: false  
            

        
            
    })
    

    }

    handleNextClick= async ()=>{
        console.log("next")

        if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){

       

        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a9f5f7be01024e58bbcd7cf5f3dcfaa6&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`; 
           this.setState({loading:true});
            let data = await fetch(url);
            let parsedData= await data.json();    
            this.setState({
            page:this.state.page+1,
            articles: parsedData.articles,
            loading: false  

            

        })
        }
    }
  render() {
    return (
      <div className="container my-3">
          <h1 className="text-center">Top Headlines</h1>
          {this.state.loading && <Spinner/>}
        
           
        <div className="row">
          
        {! this.state.loading && this.state.articles.map((element)=>{
        return    <div className="col-md-4" key={element.url}>
             <NewsItem title={element.title} description={element.description} imageUrl= {element.urlToImage} newsUrl={element.url}            
              />
           </div>
         
        })}
             
        </div>
        <div className="container d-flex justify-content-between">
        <button type="button" disabled={this.state.page<=1}  className="btn btn-dark" onClick={this.handleBackClick}> &larr; Back</button>
        <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick} >Next &rarr;</button>


        </div>

      </div>
    );
  }
}

export default News;

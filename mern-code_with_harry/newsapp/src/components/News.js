import React, { Component } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalArticles: 0
    }
  }

  async updateNews (pageNo) {
    this.setState({loading: true})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3c051c5735e94025b86d5805a2c01750&page=${pageNo}&pageSize=${this.props.pageSize}`;
    // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3c051c5735e94025b86d5805a2c01750&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: parsedData.articles,
       totalArticles: parsedData.totalResults,
      loading:false })
  }

  async componentDidMount() {
    console.log("componentdid mount working");
    this.setState({loading: true})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3c051c5735e94025b86d5805a2c01750&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: parsedData.articles,
       totalArticles: parsedData.totalResults,
      loading:false })
  }

  fetchMoreData = async () =>{
    this.setState({page: this.state.page+1})
    // this.setState({loading: true})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3c051c5735e94025b86d5805a2c01750&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3c051c5735e94025b86d5805a2c01750&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
       articles: this.state.articles.concat(parsedData.articles),
       totalArticles: parsedData.totalResults,
       })
  }

  handlePrev = async () => {
    console.log("prev")
    // this.setState({loading: true})
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3c051c5735e94025b86d5805a2c01750&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false
    // })
    // this.setState({page: this.state.page - 1});
    await this.updateNews(this.state.page - 1);
    this.setState({page: this.state.page - 1});
  }

  handleNext = async () => {
    console.log("next")
    // console.log(this.state.totalArticles)
    // if ((this.state.page + 1) > Math.ceil((this.state.totalArticles)/this.props.pageSize)) {
    //   //do nothing
    // }
    // else {
    //   this.setState({loading: true})
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3c051c5735e94025b86d5805a2c01750&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   console.log(parsedData);
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading: false
    //   })
    // }
    // this.setState({page: this.state.page + 1});
    await this.updateNews(this.state.page + 1);
    this.setState({page: this.state.page + 1});
  }



  render() {
    return (
      <div>
        This is a news component
        <br></br>
        {this.state.loading && <Spinner></Spinner>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next = {this.fetchMoreData}
          hasMore = {this.state.articles.length !== this.state.totalArticles}
          loader = {<Spinner></Spinner>}
          >
            <div className="row">
          {/*!this.state.loading &&*/ this.state.articles.map((element) => {
            console.log(element)
            return < div className="col-md-4" key={element.url} >
              <NewsItem title={element.title} description={element.description} newsUrl={element.url}
                imageUrl={element.urlToImage}></NewsItem>
            </div>
          })}
        </div>
        </InfiniteScroll>
        {/* <div className="container">
          <div className="d-flex justify-content-between">
            <button disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrev}>&larr; Previous</button>
            <button disabled={(this.state.page + 1) > Math.ceil((this.state.totalArticles)/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
          </div>
        </div> */}
      </div >

    )
  }
}

export default News
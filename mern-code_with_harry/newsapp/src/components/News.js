import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

    async componentDidMount(){
        console.log("componentdid mount working");
        let url = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=3c051c5735e94025b86d5805a2c01750";
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
    }

  render() {
    return (
      <div>This is a news component
          <NewsItem></NewsItem>
          <NewsItem></NewsItem>
          <NewsItem></NewsItem>
          <NewsItem></NewsItem>
          <NewsItem></NewsItem>
      </div>

    )
  }
}

export default News
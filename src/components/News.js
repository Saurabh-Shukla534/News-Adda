import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = ( props ) => {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalResults, setTotalResults] = useState(0)
    
    // const handlePreviousClick = async() => {
    //     // this.setState({
    //     //     page: this.state.page - 1
    //     // }, () => this.updateNews())
    //     setPage(page - 1)
    //     updateNews();
    // }
    
    // const handleNextClick = async () => {
    //     // if(this.state.page + 1 <= Math.ceil(this.state.totalResults/this.props.pageSize)) {
    //     //     this.setState({
    //     //         page: this.state.page + 1
    //     //     }, () => this.updateNews())
    //     // }
    //     setPage(page + 1);
    //     updateNews();
    // }
        
    const updateNews = async() => {
        props.setProgress(10);
        setLoading(true);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        props.setProgress(30);
        let data = await fetch(url);
        let parsedData = await data.json();
        props.setProgress(70);
        if(parsedData.status === 'ok') {
            setArticles(parsedData.articles);
            setTotalResults(parsedData.totalResults);
        } else {
            setArticles([]);
            setTotalResults(0);
        }
        setLoading(false);
        props.setProgress(100);
    }
    
    useEffect(() => {
        document.title = props.category === 'general' ? 'News Adda - A web app for latest news' : props.category.charAt(0).toUpperCase() + props.category.substring(1) + '- News Adda';
        updateNews();
        //eslint-disable-next-line
    }, [])

    const fetchMoreData = async() => {
        setLoading(true);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        setLoading(false);
    }
    
    return (
        <>
            {!loading && totalResults === 0 && <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ marginTop: '56px'}}>
                <strong>API rate limit exceeded!</strong> You should try sometime later.
                {/* <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
            </div>}
            <div className='container' style={{padding: '0 2rem', height: '100vh', marginTop: '70px'}}>
                <h1 className='text-center mt-3'>News Adda - Top {props.category} headlines</h1>
                {loading && <Spinner />}

                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length < totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row my-2">
                            {articles.map((ele) => {
                                return <div className="col-md-4 my-4" key={ele.url}>
                                    <NewsItem title={!ele.title ? '' :ele.title.substring(0, 60)} description={!ele.description ? '' :ele.description.substring(0, 100)} imageUrl={ele.urlToImage} newsUrl={ele.url}
                                    author={ele.author} date={ele.publishedAt} source={ele.source.name}/>
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>

                {/* <div className="container d-flex justify-content-between mb-5">
                    <button type="button" className="btn btn-dark" onClick={handlePreviousClick} disabled={page <= 1}> &larr; Previous</button>
                    <button type="button" className="btn btn-dark" onClick={handleNextClick} disabled={page + 1 > Math.ceil(totalResults/props.pageSize)}>Next &rarr;</button>
                </div> */}
            </div>
        </>
    )
}

// News.defaultProps = {
//     pageSize: 5,
//     country: 'in',
//     category: 'general'
// }

News.propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string
}

export default News;
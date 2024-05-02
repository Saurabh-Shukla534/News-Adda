import React from 'react'
import noImage from '../assets/no_image.jpg';

const NewsItem = (props) => {

    const imageOnError = (event) => {
        // Handle broken image event
        event.target.src = noImage; // Replace with a fallback image
    };

    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
        <div className="card" style={{ height: "27rem" }}>
            {/* <span className="position-absolute translate-middle badge rounded-pill text-bg-info" style={{left:'80%', bottom: '3.5rem', zIndex: 1}}>{source}</span> */}
            <div className='d-flex position-absolute top-0 end-0'>
                <span className="badge rounded-pill text-bg-info">{source}</span>
            </div>
            <img src={!imageUrl ? noImage : imageUrl} className="card-img-top" alt="..." style={{ overflow: 'hidden' }} onError={imageOnError}/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <a href={newsUrl} className="btn btn-dark" target='_blank' rel="noreferrer">Read More</a>
            </div>
            <div className="card-footer">
                <small className="text-body-secondary">By {author ? author : 'Unknown'} on { new Date(date).toUTCString()}</small>
            </div>
        </div>
    )
}

export default NewsItem;
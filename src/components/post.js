import React, { useState, useEffect } from 'react';

function Post(props) {

  return (
    <div>
        {
          props.insightsData.map(function(item){
              return  (
                <div className="abl--row abl--padded-b" key={item.GUID}>
                  <a className="abl--no-decoration" href={item.BlogUrl} target="_self"> 
                      <article className="abl--insights-block-side-by-side">
                          <div className="col--12 col--sm-5">
                            <img className="contained" src={`http://www.alliancebernstein.com${item.HeroImage}`} title="" alt={item.Headline} />
                            {item.ContentTypes == "Video" ? <div className="abl--video-icon"></div> : null}
                          </div>
                          <div className="col--12 col--sm-7">
                              <h3> {item.Headline} </h3>
                              <p className="abl--insights-date">{item.PublishedDateString} | {item.InsightType}</p>
                              <p>{item.Teaser}</p>
                          </div> 
                      </article>
                  </a>
                </div>
              )
            })
        }
    </div>
  )

  
}

export default Post;

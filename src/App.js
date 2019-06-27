import React, { useState, useEffect } from 'react';
import Post from './components/post';
import axios from 'axios';
import _ from 'lodash';

function App() {
  //useState is a function that takes in the initial state and returns an array containing the state, and the state handler.
  const [isError, setIsError] = useState(false);
  const authorNames = document.getElementById('authorsDataElement').getAttribute('data-names');
  const category = document.getElementById('authorsDataElement').getAttribute('data-category');
  let authors = authorNames.split(",");
  let urls = [];
  let promises = [];
  const [insightsData, setData] = useState([]);
  // authors.map(name =>{
  //   urls.push(`http://methodeabcom.staging.acml.com/sites/api_service/Insights/GetAuthorArticles?authorName=${encodeURIComponent(name)}&numRecords=5&segment=56`);
  // });
  //production
  authors.map(name =>{
      urls.push(`/sites/api_service/Insights/GetAuthorArticles?authorName=${encodeURIComponent(name)}&numRecords=5&segment=56`);
    });

  function fetchData(){
    //create promises
    for (let i=0; i < urls.length; i++){
      promises.push(axios.get(urls[i])); 
    }

    //a promise to pull records by category. Add to the array of promises
    //Production. 
    promises.push(axios.get(`/sites/api_service/Insights/GetTopicsResults?numRecords=5&insightCategory=${category}`));
    // promises.push(axios.get(`http://methodeabcom.staging.acml.com/sites/api_service/Insights/GetTopicsResults?numRecords=5&insightCategory=${category}`));
 
    var Promise = require("es6-promise");
    Promise.polyfill();
    //wait for all promises to resolve and get the results
    Promise.all(promises)
    .then(function(values) {
      var joined = [];
      for (let i=0; i < values.length; i++){
        joined.push(values[i].data.InsightsResults.Records);
      }
      //concatinate all results into one array. First parameter in apply function says to concat to empty array
      joined = Array.prototype.concat.apply([], joined);
      //remove duplicates
      var merged = _.uniqWith(joined, _.isEqual);
      //sort by date
      merged = sortByKey(merged, 'PublishedDateObj');
      merged = merged.reverse().slice(0,6);
      setData(merged);
    })
    .catch(function(err) {
      console.log(err.message); 
      setIsError(true);
    });
  }

  function sortByKey(array, key){
    return array.sort(function(a, b){
      var keyA = new Date(a[key]),
          keyB = new Date(b[key]);
        // Compare the 2 dates
        if(keyA < keyB) return -1;
        if(keyA > keyB) return 1;
        return 0;
    });
  }
 

  //useEffect is used in place of componentDidMount
  useEffect(() => {fetchData()}, urls);

  if (insightsData.length > 0) {
    return (
      <div>
        <Post insightsData = {insightsData}/>
        <div className="ab--row">
              <a href="https://www.alliancebernstein.com/library/topic.htm?insightCategory=Economic+Perspectives" className="abl--button abl--button-square-teal-border">More Economic Insights</a>
          </div>
      </div>
    );
  }
  else {
    return <div>
      <p>Loading</p>
      {isError ? <div>Something went wrong</div> : null}
    </div>
  }
  

  
}

export default App;

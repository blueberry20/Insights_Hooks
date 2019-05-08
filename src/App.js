import React, { useState, useEffect } from 'react';
import Post from './components/post';

function App() {

  const [insightsData, setData] = useState([]);
  //useState is a function that takes in the initial state and returns an array containing the state, and the state handler.
  const [isError, setIsError] = useState(false);
  const url = 'http://methodeabcom.staging.acml.com/sites/api_service/Insights/GetAuthorArticles?authorName=Williams_Darren&numRecords=5&segment=34';

 
  async function fetchData() {
    setIsError(false);
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json.InsightsResults.Records);
    } catch (error) {
      setIsError(true);
    }
  }

  //useEffect is used in place of componentDidMount
  useEffect(() => {fetchData()},[url]);

  // setTimeout(function(){
  //   console.log(insightsData);
  // }, 1000)
  

  if (insightsData.length > 0) {
    return (
      <div>
        <h2 className="abl--padded-b">Insights</h2>
        <Post insightsData = {insightsData}/>
      </div>
    );
  }
  else {
    return <div>Loading</div>
    {isError ? <div>Something went wrong</div> : null}
  }
  

  
}

export default App;

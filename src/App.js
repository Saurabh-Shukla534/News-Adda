import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  const pageSize = 15;
  const [progress, setProgress] = useState(0)
  const apiKey = process.env.REACT_APP_API_KEY;

  return (
    <div>
        <Navbar />
        <LoadingBar
          color='#f11946'
          progress={progress}
          // onLoaderFinished={() => setProgress(0)}
        />
        <Routes>
          <Route path="/" element={<News pageSize={pageSize} country='in' category='general' key='general' setProgress={setProgress} apiKey={apiKey}/>}></Route>
          <Route path="/business" element={<News pageSize={pageSize} country='in' category='business' key='business' setProgress={setProgress} apiKey={apiKey}/>}></Route>
          <Route path="/entertainment" element={<News pageSize={pageSize} country='in' category='entertainment' key='entertainment' setProgress={setProgress} apiKey={apiKey}/>}></Route>
          <Route path="/health" element={<News pageSize={pageSize} country='in' category='health' key='health' setProgress={setProgress} apiKey={apiKey}/>}></Route>
          <Route path="/science" element={<News pageSize={pageSize} country='in' category='science' key='science' setProgress={setProgress} apiKey={apiKey}/>}></Route>
          <Route path="/sports" element={<News pageSize={pageSize} country='in' category='sports' key='sports' setProgress={setProgress} apiKey={apiKey}/>}></Route>
          <Route path="/technology" element={<News pageSize={pageSize} country='in' category='technology' key='technology' setProgress={setProgress} apiKey={apiKey}/>}></Route>
        </Routes>
      </div>
  )
}

export default App;
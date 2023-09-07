import React, { useState, useEffect } from 'react';
import Post from './Post.jsx';
import '../stylesheets/Feed.css';

const url = 'http://localhost:3000/api/posts';

const Feed = props => {
  const [feedData, setFeedData] = useState([]);
  const { feedChange, setFeedChange } = props;
  useEffect(() => {
    fetch(url)
      .then(data => data.json())
      .then(postObjArr => {
        console.log('logged')
        console.log(postObjArr);
        const filteredPostObjArr = postObjArr.filter(el => props.prefs[el.preference]).reverse();
        console.log('Filtered',filteredPostObjArr)
        setFeedData(filteredPostObjArr);
        setFeedChange(false);
      });
  }, [props.prefs, props.feedChange]);

  const feedArray = [];
  console.log('AfterMount',feedData)
  for (let i = 0; i < feedData.length; i++) {
    console.log('forloop')
    console.log(`This is the ${feedData[i]}`)
    feedArray.push(<Post key={i} postInfo={feedData[i]} feedChange={props.feedChange} setFeedChange={props.setFeedChange} />);
    // console.log(`<Post key=${i} postInfo=${feedData[i]}/>)`);
    // console.log(feedData[i]);
  }

  return (
    <div className='feed-container'>
      <div className='feed'>{feedArray}</div>
    </div>
  );
};

export default Feed;

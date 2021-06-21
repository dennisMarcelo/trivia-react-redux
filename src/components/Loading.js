import * as React from 'react';
import LoadingGif from '../images/loading-pc.gif';

class Loading extends React.Component {
  render() {
    return <img src={ LoadingGif } width="200px" alt="loading" />;
  }
}

export default Loading;

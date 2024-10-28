import React from 'react';

    const Summary = ({ onEndOfDay }) => {
      return (
        <div className="summary">
          <h2>End of Day Summary</h2>
          <button onClick={onEndOfDay}>Continue to Next Day</button>
        </div>
      );
    };

    export default Summary;

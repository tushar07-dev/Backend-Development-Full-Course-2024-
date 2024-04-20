import React from 'react';

function Result({ isSuccessful, capturedBy }) {
  return (
    <div>
      <h2>Result</h2>
      {isSuccessful ? (
        <p>
          Capture Successful! {capturedBy} found the criminal!
        </p>
      ) : (
        <p>Capture Failed! The criminal escaped again.</p>
      )}
    </div>
  );
}

export default Result;

import React from 'react';

interface Props {
  total: number;
}

const Total = (props: Props) => {
  return (
    <div>
      <p>
        Number of exercises {props.total}
      </p>
    </div>
  )
}

export default Total;
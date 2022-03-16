import React from 'react';
import Part from './Part'

interface Values {
  name: string;
  exerciseCount: number;
}

interface Props {
  courses: Array<Values>
}

const Content = (props: Props) => {
  return (
    <div>
      {props.courses.map(c =>
        <p key={c.name}>
        <b>{c.name} {c.exerciseCount}</b><br/>
        <Part courses={props.courses} courseName={c.name}/>
      </p>)}
    </div>
  )
}

export default Content;
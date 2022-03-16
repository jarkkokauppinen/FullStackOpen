import React, { useState, useEffect }  from 'react';

interface Values {
  name: string;
  exerciseCount: number;
  description?: string;
  groupProjectCount?: number;
  exerciseSubmissionLink?: string;
  requirements?: Array<string>
}

interface Props {
  courseName: string;
  courses: Array<Values>
}

const Part = (props: Props) => {
  const [description, setDescription] = useState('')
  const [groupProjectCount, setGroupProjectCount] = useState('')
  const [link, setLink] = useState('')
  const [skills, setSkills] = useState('')

  useEffect(() => {
    selectCourse()
  }, [])

  const selectCourse = () => {
    props.courses.forEach(part => {
      switch(part.name) {
        case props.courseName:
          if (part.description !== undefined)
            setDescription(part.description)
          if (part.groupProjectCount !== undefined)
            setGroupProjectCount(`project exercises ${part.groupProjectCount}`)
          if (part.exerciseSubmissionLink !== undefined)
            setLink(`submit to ${part.exerciseSubmissionLink}`)
          if (part.requirements !== undefined)
            setSkills(`required skils ${part.requirements.map(skill => ' ' + skill)}`)
        break;
        default:
          break;
      }
    })
  }
  
  return (
    <>
      <i>{description}</i>
      {groupProjectCount}<br/>
      {link}
      {skills}
    </>
  )
}

export default Part;
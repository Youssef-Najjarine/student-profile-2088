import React from 'react';

export default class Students extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: []
    };
  }

  componentDidMount() {
    fetch('https://api.hatchways.io/assessment/students')
      .then(response => response.json())
      .then(data => this.setState({ students: data.students }));
  }

  handleGrades() {

  }

  handleStudents() {
    const students = this.state.students;
    if (students) {
      return students.map(student => {
        return <li key={student.id} className='students-row'>
          <div className='column-fifth'>
            <img className='student-icons' src={student.pic}/>
          </div>
          <div className='column-center'>
            <h2 className='student-city'>{student.city}</h2>
            <ul>
              <li><label>Email:</label>{student.email}</li>
              <li><label>Company:</label>{student.company}</li>
              <li><label>Skill:</label>{student.skill}</li>
              <li><label>Average: </label>{student.grades.reduce((acc, v, i, a) => (acc + v / a.length), 0)}%</li>
            </ul>
            <ul className='grades-ul'>
              {student.grades.map((grade, index) => {
                return <li key={index}>Test {index + 1}: {grade}%</li>;
              })}
            </ul>
          </div>
          <div className='column-third plus-minus-div'>
            <button className='plus-minus-buttons'><i className="fas fa-plus plus-minus-icons"></i></button>
          </div>
        </li>;
      });
    }
  }

  render() {
    return (
      <>
        <ul className='column-full student-ul'>
          {this.handleStudents()}
        </ul>
      </>
    );
  }
}

import React from 'react';
export default class Students extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      searchByName: ''

    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch('https://api.hatchways.io/assessment/students')
      .then(response => response.json())
      .then(data => this.setState({ students: data.students }));
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value });
  }

  handleStudents() {
    const students = this.state.students;
    const searchTerm = this.state.searchByName;
    if (students) {
      return students.filter(student => {
        if (searchTerm === '') {
          return student;
        } else if (student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || student.lastName.toLowerCase().includes(searchTerm.toLowerCase())) {
          return student;
        }
        return false;
      }).map(student => {
        return <li key={student.id} className='students-row'>
          <div className='column-fourth'>
            <img className='student-icons' src={student.pic}/>
          </div>
          <div className='column-half'>
            <h2 className='student-city'>{`${student.firstName} ${student.lastName}`}</h2>
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
          <div className='column-fourth plus-minus-div'>
            <button className='plus-minus-buttons'><i className="fas fa-plus plus-minus-icons"></i></button>
          </div>
        </li>;
      });
    }
  }

  render() {
    return (
      <>
      <input className='search-student-by-name column-full' onChange={this.handleChange} name='searchByName' value={this.state.searchByName} placeholder='Search by name' type="text"/>
        <ul className='column-full student-ul'>
          {this.handleStudents()}
        </ul>
      </>
    );
  }
}

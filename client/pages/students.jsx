import React from 'react';
export default class Students extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      searchByName: '',
      searchByTag: '',
      activeId: 0
    };
    this.handleToggleDropDown = this.handleToggleDropDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleTagsSubmit.bind(this);
  }

  componentDidMount() {
    fetch('https://api.hatchways.io/assessment/students')
      .then(response => response.json())
      .then(data => {
        const students = data.students;
        for (let i = 0; i < students.length; i++) {
          students[i].tags = [];
        }
        this.setState({ students: students });
      });
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value });
  }

  handleTagsSubmit(event, fullName, studentId) {
    event.preventDefault();
    if (!this.state[fullName].trim()) {
      return this.setState({ [fullName]: '' });
    }
    const students = this.state.students;
    const currentId = studentId;
    for (let i = 0; i < students.length; i++) {
      if (students[i].id === currentId) {
        students[i].tags.push(this.state[fullName]);
      }
    }
    this.setState({ [fullName]: '' });
  }

  handleTagsDisplay(student) {
    return student.tags.map((tag, index) => {
      return <li key={index}>{tag}</li>;
    });
  }

  handleToggleDropDown(id) {
    return this.state.activeId === id
      ? this.setState({ activeId: 0 })
      : this.setState({ activeId: id });
  }

  handleGradesDisplayed(id) {
    return this.state.activeId === id
      ? 'grades-ul'
      : 'grades-ul hidden';
  }

  handleStudents() {
    const students = this.state.students;
    const searchName = this.state.searchByName;
    const searchTag = this.state.searchByTag;
    if (students) {
      const filteredStudents = students.filter(student => {
        if (searchName === '' && searchTag === '') {
          return student;
        } else if (searchName !== '' && searchTag === '') {
          if (student.firstName.toLowerCase().includes(searchName.toLowerCase()) || student.lastName.toLowerCase().includes(searchName.toLowerCase())) {
            return student;
          }
        } else if (searchTag !== '' && searchName === '') {
          for (let i = 0; i < student.tags.length; i++) {
            if (student.tags[i].toLowerCase().includes(searchTag.toLowerCase())) {
              return student;
            }
          }
        } else if (searchName !== '' && searchTag !== '') {
          if (student.firstName.toLowerCase().includes(searchName.toLowerCase()) || student.lastName.toLowerCase().includes(searchName.toLowerCase())) {
            for (let i = 0; i < student.tags.length; i++) {
              if (student.tags[i].toLowerCase().includes(searchTag.toLowerCase())) {
                return student;
              }
            }
          }
        }
        return false;
      });
      if (filteredStudents.length === 0) {
        return <h2 className='no-results-found'>No results found</h2>;
      } else {
        return filteredStudents.map(student => {
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
            <ul className={this.handleGradesDisplayed(student.id)}>
              {student.grades.map((grade, index) => {
                return <li key={index}>Test {index + 1}: {grade}%</li>;
              })}
            </ul>
            <ul className='tags-display'>
              {this.handleTagsDisplay(student)}
            </ul>
            <form onSubmit={event => this.handleTagsSubmit(event, student.firstName + student.lastName, student.id)}>
              <input
                required
                onChange={this.handleChange}
                placeholder='Add a Tag'
                className='add-a-tag'
                name={student.firstName + student.lastName}
                type="text"
                value={this.state[student.firstName + student.lastName] || ''}
                />
            </form>
          </div>
          <div className='column-fourth plus-minus-div'>
              <button
                className='plus-minus-buttons'
                onClick={() => this.handleToggleDropDown(student.id)}
              ><i className={this.state.activeId === student.id ? 'fas fa-minus plus-minus-icons' : 'fas fa-plus plus-minus-icons'}></i>
              </button>
          </div>
        </li>;
        });
      }
    }
  }

  render() {

    return (
      <>
      <input
        className='search-student-by-name column-full'
        onChange={this.handleChange} name='searchByName'
        value={this.state.searchByName}
        placeholder='Search by name'
        type="text"
        />
        <input
          className='search-tag column-full'
          onChange={this.handleChange} name='searchByTag'
          value={this.state.searchByTag}
          placeholder='Search by tag'
          type="text"
        />
        <ul className='column-full student-ul'>
          {this.handleStudents()}
        </ul>
      </>
    );
  }
}

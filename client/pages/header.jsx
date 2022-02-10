import React from 'react';

export default function Header(props) {
  return (
    <header>
      <a href='#students' className='students-header'><h1>{props.header}</h1></a>
    </header>
  );
}

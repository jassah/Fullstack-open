// Jäi hieman epäselväksi, mitä tällä tehtävällä lopulta haettiin. Jäi epävarma fiilis, tuliko ratkaisusta sellainen kuin haettiin. 
// Todennäköisesti ei, sillä taulukkoa ei tarvitsisi viedä Contenttiin tai Totaliin, kun niillä on jokatapauksessa pääsy tuohon parts taulukkoon...
// Tehtävää tekiessä tuntuu hieman nurinkuriselta keksiä, miten pääsyn voisi estää, jotta taulukkoa tarvitsisi kuljettaa mukana.
// Jäi myös epäselväksi, olisiko esim tuon Part -komponentin voinut poistaa.

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const parts=course.parts

  const Header = (props) => {
    return (
      
        <h1>
          {props.course}
        </h1>
        
    )
  }
  const Part= (props) => {
    return (
        <p>
          {props.nimi} {props.number}
        </p>
    )
  }
  const Content = () => {
    return (
      <div>
        <Part nimi={parts[0].name} number={parts[0].exercises}/>
        <Part nimi={parts[1].name} number={parts[1].exercises}/>
        <Part nimi={parts[2].name} number={parts[2].exercises}/>
      </div>
    )
  }
  const Total = () => {
    return (
        <p>
        Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}
        </p>
    )
  }
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
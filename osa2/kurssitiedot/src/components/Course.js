const Header = ({ name }) => <h1>{name}</h1>
const Part = ({ part }) => <p>{part.name} {part.exercises}</p> // En pitäisi tätä täällä, vaan poistaisin Part komponentin. 
                                                                //En kuitenkaan ollut varma, halutaanko se harjoituksen vuoksi säilyttää
const Content = ({ parts }) => parts.map(part => <Part key={part.id} part={part} />)

const Total = ({ parts }) => {
    var sum = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
      "Total of " + sum + " exercises"
    )
}

const Course= ({course}) => (
  <>
  <Header name={course.name} />
  <Content parts={course.parts} />
  <Total parts={course.parts}/>
  </>
)

export default Course
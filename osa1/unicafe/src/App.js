import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  //En keksinyt, miksi ohjelma ei käytä uusimpia muuttujien arvoja laskutoimituksissa, joten lisäsin(tai vähensin) laskutoimitusten arvoihin uusimman palautteen lukuarvon..
  //Eli siis ongelma oli, että klikkauksella näytti aina edellisen tilanteen keskiarvon ja positiivisten määrän, ei nykyistä tilannetta. 
  // Siis varmaankin päivittää muuttujien arvoa vasta kun joku tietty osa suoritettu loppuun? 

 const incGood = () => {
    setGood(good + 1)
    setTotal(total + 1)
    setAverage(((good+1) - bad)/(total+1))
    setPositive((good+1)/(total+1))
  }

  const incNeutral = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
    setAverage(good- bad/(total+1))
    setPositive((good)/(total+1))
  }

  const incBad = () => {
    setBad(bad + 1)
    setTotal(total + 1)
    setAverage((good-1) - bad/(total+1))
    setPositive((good)/(total+1))
  }

  const Button = ({handleClick, text}) => {
    return (
      <button onClick={handleClick}>{text}</button>
    ) 
  }
const StatisticLine = ({text, value}) => {
  return (
    <tr><td>{text}</td><td>{value}</td></tr>
  )    
}


  const Statistics = (props) => {
    return (
      <table>
      <tbody>
      <StatisticLine text="GOOD" value={good} />
      <StatisticLine text="NEUTRAL" value={neutral} />
      <StatisticLine text="BAD" value={bad} />
      <StatisticLine text="TOTAL" value={total} />
      <StatisticLine text="AVERAGE" value={average} />
      <StatisticLine text="POSITIVE" value={positive} />
      </tbody>
      </table>
    )
  }
  
  const History = (props) => {
    if (total=== 0) {
      return (
        <div>
          No feedback given
        </div>
      )
    }
    return (
      <div>
      <Statistics />
      </div>
    )
  }

  return (
    <div>
      <h1>Give feedback</h1>

      <Button handleClick={incGood} text="GOD"/>
      <Button handleClick={incNeutral} text="NEUTRAL"/>
      <Button handleClick={incBad} text="BAD"/>


      <h1>Statistics</h1>
      <History />
    </div>
  )
}

export default App
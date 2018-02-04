import React from 'react'

const Osa = ({s}) => {
  return (
    <div>
      <p> {s.nimi} {s.tehtavia} </p>
    </div>
  )
}

const Otsikko = ({kurssi}) =>{

  return(
    <div>
      <h1>{kurssi.nimi}</h1>
    </div>
  )
}

const Sisalto = ({kurssit}) => {

  return (
    <div>
    {kurssit.osat.map(o=><Osa key={o.id} s={o} />)}



    </div>
  )
}

const Yhteensa = ({kurssi}) => {

  return (
    <div>
      <p>Yhteensä {kurssi.osat.map(o=>o.tehtavia).reduce((acc, curr)=>acc+curr)} tehtävää</p>
    </div>
  )

}

const Kurssi=({kurssi})=> {
  return(
    <div>
      <Otsikko kurssi={kurssi} />
      <Sisalto kurssit={kurssi} />
      <Yhteensa kurssi={kurssi} />
      </div>
    )
}

export default Kurssi

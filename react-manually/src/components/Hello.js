import React from 'react'
import styles from './Hello.css'


const Hello=({className, counter})=>(
  <p className={className}>
    hello webpack {counter} clicks
  </p>
)
 export default Hello

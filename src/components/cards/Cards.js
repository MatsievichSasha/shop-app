import React from 'react'
import Card from './Card'

let styles = {
  ul: {
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap',
  },
}

export default function Cards() {
  return (
<ul style={styles.ul}>
  <Card></Card>
</ul>
  )
}

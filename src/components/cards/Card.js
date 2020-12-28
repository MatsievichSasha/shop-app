import React from 'react'

let styles = {
  li: {
    width: '250px',
    listStyleType: 'none',
  },

  wrapper: {
    padding: '0.5rem'
  },

  img: {
    width: '100%',
    height: '160px',
    objectFit: 'cover',
    display: 'block',
    objectPosition: '50% 0'
  },

  description: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  prices: {
    height: '55px',
  },

  price_old: {
    height: '18px',
    fontSize: '14px',
    color: '#a6a5a5',
    textDecoration: 'line-through',
  },

  price_current: {
    display: 'flex',
    justifyContent: 'space-between',
    color: 'rgb(121, 187, 23)'
  },

  price_current_value: {
    color: '#f84147'
  }
}

export default function Card() {


  
  return (
    <li style={styles.li}>
      <article style={styles.wrapper} className="wrapper">
        <a className='img__conteiner'>
          <img style={styles.img} src="images/images (1).jpg" alt="" />
        </a>
        <div className='name'>Name</div>
        <div styles={styles.prices} clasNclassNames="prices">
          <div style={styles.price_old} className="price_old">2&nbsp;599&nbsp;₴</div>
          <div style={styles.price_current} className='price_current'>
            <span style={styles.price_current_value} className="price_current_value">2&nbsp;599&nbsp;₴</span>
            <span className="price_valid"></span>valid 15 days
          </div>
        </div>
        <div style={styles.description} className='description'> Lorem ipsum dolor sit amet consectetur adipisicing elit. </div>
      </article>
    </li>
  )
}

import React from 'react'
import {NavLink} from "react-router-dom";

import styles from './index.module.css'

export const MenuItem = (props) => {
  const { bgImage, items, title } = props;

  return (
    <div style={{ backgroundImage: bgImage }} className={styles.container}>
      <div className={styles.bg}>
        <img className={styles.img} src={bgImage} alt="image"  />
      </div>
      <div className={styles.title}>
        <span>{title}</span>
      </div>
      <div className={styles.dishes}>
        {items?.map((item) => (
          <div key={item.id} className={styles.description}>
            <NavLink state={item} to={`/dish/${item.id}`} className={styles.dish_link}>
              <span>{item.name}</span>
            </NavLink>
            <div className={styles.prices}>
              <span>{item.weight}</span>
              <span>{item.price} c.</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

import React from 'react'
import {NavLink} from "react-router-dom";
import cn from 'classnames'

import bg from '../../assets/backgrounds/bg.png'

import styles from './index.module.css'

export const MenuItem = (props) => {
  const { bgImage, items, title, isLeft, zIndex, isTherePagesOnRight, isTherePagesOnLeft } = props;

  return (
    <div
      style={{ zIndex }}
      className={cn(styles.container, {
        [styles.is_left]: isLeft,
      })}
    >
      <div
        className={cn(styles.folding_right, {
          [styles.show]: isTherePagesOnRight,
        })}
      />
      <div
        className={cn(styles.folding_left, {
          [styles.show]: isTherePagesOnLeft,
        })}
      />
      <div className={styles.bg}>
        <img className={styles.img} src={bg} alt="image"  />
      </div>
      <div style={{ backgroundImage: bgImage }} className={styles.title}>
        <div className={styles.title_bg}>
          <img src={bgImage} className={styles.img} />
        </div>
        <span>{title}</span>
      </div>
      <div className={styles.dishes}>
        {items?.map((item, index) => (
          <div key={index} className={styles.description}>
            <NavLink state={item} to={`/dish/${item.id}`} className={styles.dish_link}>
              <span>{item.name}</span>
            </NavLink>
            <div className={styles.prices}>
              <span>{item.weight} г.</span>
              <span>{item.price} c.</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

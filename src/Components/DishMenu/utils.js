import greenBg from '../../assets/backgrounds/green-title-bg.png'
import roseBg from '../../assets/backgrounds/rose-title-bg.png'
import redBg from '../../assets/backgrounds/red-title-bg.png'
import violetBg from '../../assets/backgrounds/violet-title-bg.png'
import yellowBg from '../../assets/backgrounds/yellow-title-bg.png'
import purpleBg from '../../assets/backgrounds/purple-title-bg.png'
import hotRedBg from '../../assets/backgrounds/hot-red-title-bg.png'
import blueBg from '../../assets/backgrounds/blue-title-bg.png'


export const getBackgroundColor = (num) => {
  const bgs = [greenBg, roseBg, redBg, violetBg, yellowBg, purpleBg, hotRedBg, blueBg];

  return bgs[num]
}

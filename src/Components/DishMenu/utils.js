import greenBg from '../../assets/backgrounds/green-title-bg.png'
import roseBg from '../../assets/backgrounds/rose-title-bg.png'
import redBg from '../../assets/backgrounds/red-title-bg.png'
import violetBg from '../../assets/backgrounds/violet-title-bg.png'
import yellowBg from '../../assets/backgrounds/yellow-title-bg.png'
import purpleBg from '../../assets/backgrounds/purple-title-bg.png'
import hotRedBg from '../../assets/backgrounds/hot-red-title-bg.png'
import blueBg from '../../assets/backgrounds/blue-title-bg.png'

import greenLine from '../../assets/backgrounds/green_bottom_bg.png'
import roseLine from '../../assets/backgrounds/rose_bottom_bg.png'
import redLine from '../../assets/backgrounds/red_bottom_bg.png'
import violetLine from '../../assets/backgrounds/violet_bottom_bg.png'
import yellowLine from '../../assets/backgrounds/yellow_bottom_bg.png'
import purpleLine from '../../assets/backgrounds/purple_bottom_bg.png'
import blueLine from '../../assets/backgrounds/blue_bottom_bg.png'

export const getBackgroundColor = (num) => {
  const bgs = [greenBg, roseBg, redBg, violetBg, yellowBg, purpleBg, hotRedBg, blueBg];

  if (!bgs[num]) return purpleBg;
  return bgs[num]
}

export const getBottomLineColor = (num) => {
  const bgs = [greenLine, roseLine, redLine, violetLine, yellowLine, purpleLine, redLine, blueLine];

  if (!bgs[num]) return purpleLine;
  return bgs[num];
}

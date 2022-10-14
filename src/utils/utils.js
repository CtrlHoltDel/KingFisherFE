import { GiSpermWhale } from 'react-icons/gi'
import { FaFish } from 'react-icons/fa'

export const formatType = (config, type) => {
    for (const key in config) {
      const matcher = new RegExp(key, "gi");
      if (type.match(matcher)) {
        return config[key];
      }
    }
}

export const getType = (config, type) => {
    
}

export const generateIconType = (config, type) => {
  if(type === 'whale')return <div className="search-icon" style={{ "color": config.types.whale }}><GiSpermWhale /></div>
  if(type === 'fish') return <div className="search-icon" style={{ "color": config.types.fish }}><FaFish /></div>
  if(type === 'reg') return <div className="search-icon" style={{ "color": config.types.reg }}><GiSpermWhale /></div>
}

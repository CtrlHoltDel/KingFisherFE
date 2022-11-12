const DEFAULT_STYLE = { 
    backgroundColor: "#f5f5f5"
}
const DEFAULT_BUTTON = { backgroundColor: '#26a6fe', color: "white" }

export const setSeatStyle = (type, config) => {
    if(!type) return DEFAULT_STYLE
    const style = setConfig(type, config)
    return style
}

export const setHeaderStyle = (type, config) => {
    if(!type) return {}
    const style = setConfig(type, config)
    return style
}

export const setButtonStyle = (type, config,) => {
  if(!type) return DEFAULT_BUTTON
  const style = setConfig(type, config)
  return style
}

const setConfig = (type, config) => {
  for (const key in config) {
    const matcher = new RegExp(key, "gi");
    if (type.match(matcher)) {
      return config[key];
    }
  }
}
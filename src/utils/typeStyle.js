const DEFAULT_STYLE = { 
    backgroundColor: "#f5f5f5"
}

export const setSeatStyle = (type, config) => {
    if(!type) return DEFAULT_STYLE

    for (const key in config) {
      const matcher = new RegExp(key, "gi");
      if (type.match(matcher)) {
        console.log(config[key], "<<");
        return config[key];
      }
    }
}

export const setHeaderStyle = (type, config) => {
    if(!type) return {}

    for (const key in config) {
      const matcher = new RegExp(key, "gi");
      if (type.match(matcher)) {
        console.log(config[key], "<<");
        return config[key];
      }
    }
}
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
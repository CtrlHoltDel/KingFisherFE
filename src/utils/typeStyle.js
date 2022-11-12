const DEFAULT_STYLE = { 
    backgroundColor: "#f5f5f5"
}

export const setSeatStyle = (type) => {
    if(!type) return DEFAULT_STYLE

    if(type === 'reg') return { backgroundColor: "red", color: "white" }
}
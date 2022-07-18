const COLORS = ["#3E5641", "#A24936", "#D36135", "#282B28", "#83BCA9"];

export const getColor = (index: number) => COLORS[index % COLORS.length];
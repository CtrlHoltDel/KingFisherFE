import { formatDistanceToNow } from "date-fns";

export const dateFormat = (sqlDate) => {
    // const formattedDate = format(new Date(sqlDate), "dd/MM/yyyy");
  
    const distance = formatDistanceToNow(new Date(sqlDate), {
      addSuffix: true,
    });

    

    return `${distance}`;
};
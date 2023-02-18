// customer helper functions to reformat time and date retrieved from database
function formatTime(date) {
    return date.toLocaleTimeString();
};

function formatDate(date) {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
      new Date(date).getFullYear() 
    }`;
};

// exports helper functions
module.exports = { formatTime, formatDate };
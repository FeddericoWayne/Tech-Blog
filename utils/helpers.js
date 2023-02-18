function formatTime(date) {
    return date.toLocaleTimeString();
};


function formatDate(date) {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
      new Date(date).getFullYear() 
    }`;
};

module.exports = { formatTime, formatDate };
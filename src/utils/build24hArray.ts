export const build24hArray = () => {
    var last24HoursTimes = [];

    var currentDateTime = new Date();

    var twentyFourHoursAgo = new Date(currentDateTime.getTime() - 24 * 60 * 60 * 1000);

    while (currentDateTime > twentyFourHoursAgo) {
        var hours = currentDateTime.getHours();
        var minutes = currentDateTime.getMinutes();

        var formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

        last24HoursTimes.unshift(formattedTime);

        currentDateTime = new Date(currentDateTime.getTime() - 60 * 60 * 1000);
    }
    return last24HoursTimes;
};

module.exports = async function handler(req, res) {

    const city = req.query.city;
    const type = req.query.type || "current";

    if (!city) {
        return res.status(400).json({
            error: "City is required"
        });
    }

    const endpoint =
        type === "forecast"
            ? "forecast.json"
            : "current.json";

    let url =
        "https://api.weatherapi.com/v1/" +
        endpoint +
        "?key=" +
        process.env.WEATHER_API_KEY +
        "&q=" +
        encodeURIComponent(city) +
        ",India&aqi=yes";

    if (type === "forecast") {
        url += "&days=7";
    }

    try {

        const response = await fetch(url);
        const data = await response.json();

        return res.status(response.status).json(data);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: "Unable to fetch weather data"
        });

    }
};

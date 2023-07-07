//getCurrent position
function curSuccess(pos) {
    const coords = pos.coords;
    console.log(`Lat :${coords.latitude}, Lng :${coords.longitude}`);
    console.log(`Within:${coords.accuracy}`);
}

function curError(err) {
    console.log(`Error: ${err.code} - ${err.message}`);
}

const curOptions = {
    enableHightAccuracy: true, //enable gps id available
    timeout: 5000, //time to wait to stop trying for location
    maximumAge: 0, //do not use a cached position
};
navigator.geolocation.getCurrentPosition(curSuccess, curError, curOptions);

//watch Position

const target = {
    latitude: 17.3423,
    longitude: -29.1234,
};
function watchSuccess(pos) {
    const coords = pos.coords;
    if (
        target.latitude === coords.latitude &&
        target.longitude === coords.longitude
    ) {
        console.log('Congratulations, you reached the target');
        navigator.geolocation.clearWatch(id);
    }
}

function watchError(err) {
    console.log(`Error: ${err.code} - ${err.message}`);
}

const watchOptions = {
    enableHightAccuracy: true, //enable gps id available
    timeout: 5000, //time to wait to stop trying for location
    maximumAge: 0, //do not use a cached position
};
const id = navigator.geolocation.watchPosition(
    watchSuccess,
    watchError,
    watchOptions
);

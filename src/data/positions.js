// data/positions.js

function importAll(r) {
    return r.keys().map(r);
}

// This will import all images in the ./positions folder
const positions = importAll(require.context('./positions', false, /\.(png|jpe?g|gif|svg)$/));

export default positions;
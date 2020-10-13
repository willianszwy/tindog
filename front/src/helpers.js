const getImageURL = path => process.env.REACT_APP_STATIC_SERVER + `uploads/${path}`;
export default getImageURL;
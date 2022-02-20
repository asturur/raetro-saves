const Minio = require('minio')
const { v4: uuidv4 } = require('uuid');

const minioClient = new Minio.Client({
    endPoint: process.env.BUCKET_ADDRESS,
    port: parseInt(process.env.BUCKET_PORT, 10),
    useSSL: false,
    accessKey: process.env.BUCKET_KEY,
    secretKey: process.env.BUCKET_SECRET,
});

const writeFile = (req, res) => {
    const files = req.files;
    const promises = Object.keys(files).map((filekey) => {
        const { md5, data, name, size } = files[filekey];
        const metaData = {
            'Content-Type': 'application/octet-stream',
            md5,
            name,
        }
        const filename = `${uuidv4()}-${name}`;
        return new Promise((resolve, reject) => {
            minioClient.putObject(process.env.BUCKET_NAME, filename, data, size, metaData, function(err, etag) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ filename, etag });
                }
            });
        });
    });
    return Promise.all(promises);
}

const readFileList = (req, res) => {
    return new Promise((resolve, reject) => {
        const data = [];
        const stream = minioClient.extensions.listObjectsV2WithMetadata(process.env.BUCKET_NAME);
        stream.on('data', (obj) => data.push(obj));
        stream.on('end', () => resolve(data));
        stream.on('error', (err) => reject(err));
    });
}

module.exports = {
    writeFile,
    readFileList,
};
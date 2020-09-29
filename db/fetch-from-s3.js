const AWS = require('aws-sdk');
const fs = require('fs');

var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
AWS.config.credentials = credentials;

s3 = new AWS.S3();

const bucketName = 'gnt-data-files';
const keyNames =  ['Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', '1Corinthians', '2Corinthians', 'Galatians',
                 'Ephesians', 'Philippians', 'Colossians', '1Thessalonians', '2Thessalonians', '1Timothy', '2Timothy',
                 'Titus', 'Philemon', 'Hebrews', 'James', '1Peter', '2Peter', '1John', '2John', '3John', 'Jude', 'Revelation'];

function fetchBook() {
    keyNames.forEach(key => {
        const params = {
            Bucket: bucketName,
            Key: key + '.txt'
        };
        s3.getObject(params, (err, data) => {
           if (err) console.error(err, err.stack);
           else {
              // console.log(data);
              let file = fs.createWriteStream(`../../assets/${key}.txt`);
              s3.getObject(params).createReadStream().pipe(file);
              console.log(`${key}.txt saved to assets.`);
           }
       })
    });
}

fetchBook();



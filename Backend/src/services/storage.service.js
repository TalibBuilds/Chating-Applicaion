const ImageKit = require('@imagekit/nodejs');

const client = new ImageKit({
  privatekey: process.env.IMAGEKIT_PRIVATE_KEY
})

const uploadFile = async (file) => {
      const responce = await client.files.upload({
        file: file.buffer.toString('base64'),
        fileName: file.originalname,
      })
     return responce;
}


module.exports = uploadFile
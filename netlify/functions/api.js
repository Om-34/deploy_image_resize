const sharp = require('sharp');

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { image, width, height } = JSON.parse(event.body);
    
    // Remove the data URL prefix (e.g., "data:image/png;base64,")
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const imageBuffer = Buffer.from(base64Data, 'base64');

    const resizedBuffer = await sharp(imageBuffer)
      .resize(parseInt(width), parseInt(height))
      .toBuffer();

    return {
      statusCode: 200,
      headers: { "Content-Type": "image/png" },
      body: resizedBuffer.toString('base64'),
      isBase64Encoded: true
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
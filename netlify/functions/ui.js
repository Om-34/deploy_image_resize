exports.handler = async () => {
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
      <title>Serverless Resizer</title>
      <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-gray-100 min-h-screen flex items-center justify-center">
      <div class="bg-white p-8 rounded-xl shadow-md w-96">
          <h1 class="text-xl font-bold mb-4">API-Powered Resizer</h1>
          <input type="file" id="fileInput" class="mb-4 w-full">
          <input type="number" id="w" placeholder="Width" class="border p-2 w-full mb-2">
          <button onclick="upload()" id="btn" class="bg-blue-600 text-white w-full py-2 rounded">Resize via API</button>
          <img id="result" class="mt-4 hidden border" />
      </div>

      <script>
          async function upload() {
              const file = document.getElementById('fileInput').files[0];
              const width = document.getElementById('w').value;
              const btn = document.getElementById('btn');
              
              if(!file || !width) return alert("Select file and width");
              
              btn.innerText = "Processing...";
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = async () => {
                  const res = await fetch('/api/resize', {
                      method: 'POST',
                      body: JSON.stringify({ image: reader.result, width, height: null })
                  });
                  const blob = await res.blob();
                  const url = URL.createObjectURL(blob);
                  const img = document.getElementById('result');
                  img.src = url;
                  img.classList.remove('hidden');
                  btn.innerText = "Resize via API";
              };
          }
      </script>
  </body>
  </html>
  `;

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/html" },
    body: html
  };
};
document.getElementById('shorten-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const url = document.getElementById('url-input').value;
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = 'Encurtando...';

    try {
        const response = await fetch('/api/shorten', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });
        const data = await response.json();
        if (response.ok) {
            resultDiv.innerHTML = `URL encurtada: <a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a>`;
        } else {
            resultDiv.textContent = data.error || 'Erro ao encurtar a URL.';
        }
    } catch (err) {
        resultDiv.textContent = 'Erro de conexão com o servidor.';
    }
});
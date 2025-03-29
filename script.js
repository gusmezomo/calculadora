function calcular() {
    const grauA = parseFloat(document.getElementById("grauA").value);
    const grauB = parseFloat(document.getElementById("grauB").value);

    if (isNaN(grauA) || isNaN(grauB)) {
        document.getElementById("result").innerHTML = "Por favor, insira notas válidas.";
        return;
    }

    const pesoA = 0.33;
    const pesoB = 0.67;
    const media = (grauA * pesoA) + (grauB * pesoB);

    if (media >= 6.0) {
        document.getElementById("result").innerHTML = `
            <strong>Média:</strong> ${media.toFixed(2)}<br>
            <strong>Status:</strong> Aprovado! 🎉
        `;
    } else {
        const notaMinA = Math.ceil(((6.0 - (grauB * pesoB)) / pesoA) * 10) / 10;
        const notaMinB = Math.ceil(((6.0 - (grauA * pesoA)) / pesoB) * 10) / 10;

        const recomendacao = notaMinA <= notaMinB ? "A" : "B";

        document.getElementById("result").innerHTML = `
            <strong>Média:</strong> ${media.toFixed(2)}<br>
            <strong>Status:</strong> Reprovado 😞<br><br>
            Para ser aprovado no Grau C:<br>
            - Nota mínima no Grau A: ${notaMinA.toFixed(1)}<br>
            - Nota mínima no Grau B: ${notaMinB.toFixed(1)}<br>
            <strong>Recomendação:</strong> Substituir Grau ${recomendacao}.
        `;
    }

    document.getElementById("extraFields").style.display = "block";

}

function bloquearNotasInvalidas(id) {
    const input = document.getElementById(id);

    input.addEventListener('input', () => {
        let valor = input.value.replace(',', '').replace('.', '');

        // Remove qualquer caractere que não seja número
        valor = valor.replace(/[^0-9]/g, '');

        // Se tiver 2 ou mais dígitos, transforma em decimal (ex: 53 -> 5.3)
        if (valor.length >= 2) {
            valor = valor.slice(0, 2); // pega os dois primeiros dígitos
            valor = valor[0] + '.' + valor[1];
        } else if (valor.length === 1) {
            valor = valor;
        } else {
            valor = '';
        }

        // Limita o valor entre 1 e 10
        const num = parseFloat(valor);
        if (!isNaN(num)) {
            if (num > 10) valor = '10';
            else if (num < 1) valor = '1';
        }

        input.value = valor;
    });
}

function copiarResultado() {
    const cadeira = document.getElementById("cadeira").value.trim();
    const resultDiv = document.getElementById("result");
    const textoBruto = resultDiv.innerText;

    const textoFormatado = 
        (cadeira ? `📚 Cadeira: ${cadeira}\n` : '') +
        textoBruto;

    navigator.clipboard.writeText(textoFormatado).then(() => {
        alert("Resultado copiado para a área de transferência!");
    }).catch(() => {
        alert("Não foi possível copiar. Tente manualmente.");
    });
}



window.addEventListener('DOMContentLoaded', () => {
    bloquearNotasInvalidas('grauA');
    bloquearNotasInvalidas('grauB');
});

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
}

function calcular() {
    let grauA = document.getElementById("grauA").value.replace(',', '.');
    let grauB = document.getElementById("grauB").value.replace(',', '.');

    grauA = grauA ? parseFloat(grauA) : null;
    grauB = grauB ? parseFloat(grauB) : null;

    const pesoA = 0.33;
    const pesoB = 0.67;

    // Nenhuma nota preenchida
    if (grauA === null && grauB === null) {
        document.getElementById("result").innerHTML = "Por favor, insira pelo menos a nota do Grau A.";
        return;
    }

    // Apenas Grau A preenchido → calcular quanto precisa no Grau B
    if (grauA !== null && grauB === null) {
        if (isNaN(grauA) || grauA < 0.1 || grauA > 10) {
            document.getElementById("result").innerHTML = "A nota do Grau A deve estar entre 0.1 e 10.";
            return;
        }

        const notaMinB = ((6.0 - (grauA * pesoA)) / pesoB);
        if (notaMinB > 10) {
            document.getElementById("result").innerHTML = `
                <strong>Nota do Grau A:</strong> ${grauA}<br>
                😞 Infelizmente, mesmo com 10 no Grau B não é possível atingir média 6.
            `;
        } else {
            document.getElementById("result").innerHTML = `
                <strong>Nota do Grau A:</strong> ${grauA}<br>
                Para ser aprovado, você precisa tirar <strong>${notaMinB.toFixed(1)}</strong> no Grau B.
            `;
        }

        document.getElementById("extraFields").style.display = "block";
        return;
    }

    // Cálculo normal com os dois preenchidos
    if (isNaN(grauA) || isNaN(grauB)) {
        document.getElementById("result").innerHTML = "Por favor, insira notas válidas.";
        return;
    }

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

        let textoReprovado = `
            <strong>Média:</strong> ${media.toFixed(2)}<br>
            <strong>Status:</strong> Reprovado 😞<br><br>
            Para ser aprovado no Grau C:<br>
        `;

        textoReprovado += `<strong>Recomendação:</strong> Substituir Grau ${recomendacao}.<br><br>`;

        if (recomendacao === "A") {
            textoReprovado += `- Nota mínima no Grau A: ${notaMinA.toFixed(1)}<br>`;
        } else {
            textoReprovado += `- Nota mínima no Grau B: ${notaMinB.toFixed(1)}<br>`;
        }

        document.getElementById("result").innerHTML = textoReprovado;
    }

    document.getElementById("extraFields").style.display = "block";

    document.getElementById("compartilharBtn").style.display = "block";
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
            else if (num < 0.1 && valor !== '') valor = '0.1'; // ✅ aqui está o ajuste real
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

function compartilharResultado() {
    const cadeira = document.getElementById("cadeira").value.trim();
    const resultDiv = document.getElementById("result");
    const textoBruto = resultDiv.innerText;

    const textoFormatado = 
        (cadeira ? `📚 Cadeira: ${cadeira}\n` : '') +
        textoBruto;

    if (navigator.share) {
        navigator.share({
            title: 'Resultado da Calculadora Unisinos',
            text: textoFormatado
        }).catch((err) => {
            alert("Erro ao compartilhar: " + err);
        });
    } else {
        alert("Este dispositivo ou navegador não suporta o compartilhamento direto.");
    }
}

window.addEventListener('DOMContentLoaded', () => {
    bloquearNotasInvalidas('grauA');
    bloquearNotasInvalidas('grauB');
});

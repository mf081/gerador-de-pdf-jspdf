// Carregar a biblioteca jsPDF
const script = document.createElement('script'); // Cria um elemento de script
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'; // Define a URL da biblioteca jsPDF
document.head.appendChild(script); // Adiciona o script ao cabeçalho do documento

// Quando o script é carregado
script.onload = () => {
    const { jsPDF } = window.jspdf; // Desestrutura o objeto jsPDF da biblioteca carregada

    // Solicitar ao usuário o nome do arquivo PDF
    let pdfDocumentName = prompt("Digite o nome do arquivo PDF:", "Document") || "Document";
    
    // Solicitar a orientação do PDF, permitindo abreviações
    let orientationInput = prompt("Escolha a orientação (vertical, horizontal, v ou h):", "vertical") || "vertical";
    // Definir a orientação com base na entrada do usuário
    let orientation = (orientationInput.toLowerCase().startsWith("h") ? "horizontal" : "vertical");
    
    // Solicitar as dimensões da página
    let pageWidth = parseInt(prompt("Digite a largura da página (ex: 800):", "800"), 10) || 800;
    let pageHeight = parseInt(prompt("Digite a altura da página (ex: 450):", "450"), 10) || 450;

    // Função para gerar o PDF
    function generatePDF_DataFile() {
        // Cria um novo documento PDF com as configurações fornecidas
        const pdf = new jsPDF(orientation === "horizontal" ? "l" : "p", "pt", [pageWidth, pageHeight]);
        
        // Obtém todas as imagens da página
        let imgTags = document.getElementsByTagName("img");
        let checkURLString = "blob:https://drive.google.com/"; // URL padrão para verificar imagens

        // Loop por todas as imagens
        for (let i = 0; i < imgTags.length; i++) {
            // Verifica se a imagem é uma URL blob do Google Drive
            if (imgTags[i].src.startsWith(checkURLString)) {
                let img = imgTags[i];
                
                // Cria um canvas para capturar a imagem
                let canvas = document.createElement('canvas');
                let context = canvas.getContext("2d");
                canvas.width = img.naturalWidth; // Define a largura do canvas
                canvas.height = img.naturalHeight; // Define a altura do canvas
                
                // Desenha a imagem no canvas
                context.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
                
                // Converte a imagem em uma URL base64
                let imgDataURL = canvas.toDataURL("image/png");
                
                // Adiciona a imagem ao PDF
                pdf.addImage(imgDataURL, 'PNG', 0, 0, pageWidth, (img.naturalHeight * pageWidth) / img.naturalWidth);
                
                // Adiciona uma nova página se houver mais imagens
                if (i < imgTags.length - 1) {
                    pdf.addPage();
                }
            }
        }

        // Salva o PDF gerado com o nome fornecido
        pdf.save(pdfDocumentName + ".pdf");
    }

    // Obtém todos os elementos da página
    let allElements = document.querySelectorAll("*");
    let chosenElement;
    let heightOfScrollableElement = 0;

    // Loop para encontrar o elemento mais alto que pode ser rolado
    for (let i = 0; i < allElements.length; i++) {
        if (allElements[i].scrollHeight >= allElements[i].clientHeight) {
            if (heightOfScrollableElement < allElements[i].scrollHeight) {
                heightOfScrollableElement = allElements[i].scrollHeight;
                chosenElement = allElements[i]; // Atualiza o elemento escolhido
            }
        }
    }

    // Verifica se há um elemento rolável
    if (chosenElement && chosenElement.scrollHeight > chosenElement.clientHeight) {
        let scrollDistance = Math.round(chosenElement.clientHeight / 2); // Distância de rolagem
        let loopCounter = 0; // Contador para as iterações do loop

        // Função para rolar automaticamente o elemento
        function myLoop(remainingHeightToScroll, scrollToLocation) {
            loopCounter++; // Incrementa o contador

            setTimeout(function() {
                if (remainingHeightToScroll === 0) {
                    scrollToLocation = scrollDistance; // Define a nova posição de rolagem
                    chosenElement.scrollTo(0, scrollToLocation); // Rola o elemento
                    remainingHeightToScroll = chosenElement.scrollHeight - scrollDistance; // Atualiza a altura restante para rolar
                } else {
                    scrollToLocation += scrollDistance; // Atualiza a posição de rolagem
                    chosenElement.scrollTo(0, scrollToLocation); // Rola o elemento
                    remainingHeightToScroll -= scrollDistance; // Diminui a altura restante
                }

                // Continua rolando se ainda houver altura a rolar
                if (remainingHeightToScroll >= chosenElement.clientHeight) {
                    myLoop(remainingHeightToScroll, scrollToLocation);
                } else {
                    // Após a rolagem, gera o PDF
                    setTimeout(generatePDF_DataFile, 1500);
                }
            }, 400); // Intervalo de 400ms entre as iterações
        }

        // Inicia o loop de rolagem
        myLoop(0, 0);
    } else {
        // Se não houver rolagem, gera o PDF imediatamente
        setTimeout(generatePDF_DataFile, 1500);
    }
};

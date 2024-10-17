# README - Gerador de PDF com jsPDF

Este projeto permite gerar um arquivo PDF a partir de imagens presentes na página web, utilizando a biblioteca jsPDF. O código inclui a funcionalidade de rolagem automática em elementos que podem ser rolados para garantir que todas as imagens sejam capturadas.

## Funcionalidades

- **Carregamento Dinâmico da Biblioteca**: Carrega a biblioteca jsPDF via CDN.
- **Personalização do PDF**:
  - Nome do arquivo PDF.
  - Orientação da página (vertical ou horizontal).
  - Dimensões da página personalizáveis.
- **Captura de Imagens**: Verifica todas as imagens da página, incluindo imagens de URLs blob do Google Drive, e as adiciona ao PDF.
- **Rolagem Automática**: Se houver um elemento rolável, realiza a rolagem automática para garantir que todas as imagens sejam incluídas no PDF.
- **Geração e Download do PDF**: Após capturar as imagens, gera o PDF e inicia o download.

## Dependências

- **jsPDF**: A biblioteca é carregada do CDN:
  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
  ```

## Como Usar

1. **Incluir o Código**: Copie o código fornecido e cole-o em um arquivo JavaScript ou em um bloco `<script>` no HTML.
   
2. **Executar o Código**: O código solicitará que o usuário insira o nome do arquivo PDF, escolha a orientação e defina as dimensões da página.

3. **Aguardar Rolagem**: Se houver um elemento rolável, o script automaticamente rolará até capturar todas as imagens.

4. **Download do PDF**: O PDF será gerado e o download será iniciado automaticamente após a captura das imagens.

## Estrutura do Código

- **Importação da Biblioteca**: A biblioteca jsPDF é carregada e a funcionalidade é iniciada após o carregamento.
- **Captura de Imagens**: Imagens são convertidas em base64 e adicionadas ao documento PDF.
- **Rolagem**: Um loop de rolagem é implementado para capturar imagens de elementos que possuem rolagem.

## Considerações

- As imagens devem estar disponíveis na página no momento da execução do script.
- O código é sensível à estrutura da página; imagens dentro de elementos não roláveis podem não ser capturadas.

## Exemplo de Uso

```javascript
// Inicie a execução chamando a função principal ou incluindo o código diretamente na página.
```

## Licença

Este projeto é de uso livre. Sinta-se à vontade para modificar e usar conforme necessário.

by Mateus Fernando

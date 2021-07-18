import express from 'express';
import ejs from 'ejs';
import path from 'path';
import pdf from 'html-pdf';

const app = express();

app.use(express.json());

const passengers = [
  {
    name: "Joyce",
    flightNumber: 7859,
    time: "18h00",
  },

  {
    name: "Brock",
    flightNumber: 7859,
    time: "18h00",
  },

  {
    name: "Eve",
    flightNumber: 7859,
    time: "18h00",
  },

  {
    name: "Alessandro",
    flightNumber: 7859,
    time: "18h00",
  },

];

// primeiro callback
app.get('/', (request, response) => {

  const filePath = path.join(__dirname, "print.ejs")
  ejs.renderFile(filePath, { passengers }, (err, html) => {
    if (err) {
      return response.json({ message: 'Erro na leitura do arquivo' })
    }

    const options = {
      height: "11.25in",
      width: "8.5in",
      header: {
        height: "20mm"
      },
      footer: {
        height: "20mm"
      }
    }

    // criar o pdf - segundo callback
    pdf.create(html, options).toFile("report.pdf", (err, data) => {
      if (err) {
        return response.send("Erro ao gerar o PDF");
      }
      // enviear para o browser
      return response.send("Arquivo gerado com sucesso");
    })
  })
  
})

app.listen(3333, () => {
  console.log('🔥🔥 Server started!');
})

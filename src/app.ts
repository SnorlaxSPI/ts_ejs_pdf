import express from 'express';
import ejs from 'ejs';
import path from 'path';
import puppeteer from 'puppeteer';

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

app.get('/pdf', async(request, response) => {

  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto('http://localhost:3333/', {
      waitUntil: 'networkidle0'
  })

  const pdf = await page.pdf({
      printBackground: true
      //format: 'Letter'
  })

  await browser.close()

  response.contentType("application/pdf")

  return response.send(pdf)

})

// primeiro callback
app.get('/', (request, response) => {

  const filePath = path.join(__dirname, "print.ejs")
  ejs.renderFile(filePath, { passengers }, (err, html) => {
    if (err) {
      return response.json({ message: 'Erro na leitura do arquivo' })
    }

    return response.send(html);

  })

})

app.listen(3333, () => {
  console.log('🔥🔥 Server started!');
})

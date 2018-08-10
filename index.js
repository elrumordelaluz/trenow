const fetch = require('node-fetch')

module.exports = async (req, res) => {
  const date = new Date()
  const url =
    'http://viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno/partenze/S06923'
  const response = await fetch(`${url}/${date}`)
  const json = await response.json()
  const trains = json.map(
    ({
      destinazione,
      compRitardo,
      compNumeroTreno,
      compOrarioPartenza,
      compInStazionePartenza,
    }) => ({
      treno: compNumeroTreno,
      partenza: compOrarioPartenza,
      per: destinazione,
      ritardo: compRitardo[0],
      status: compInStazionePartenza[0],
    })
  )
  res.setHeader('content-type', 'text/html')
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>trenow</title>
    <style>
      * { box-sizing: border-box }
      body {
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
        font-size: 16px;
        line-height: 1.5;
        word-wrap: break-word;
      }
      table {
        display: block;
        width: 100%;
        overflow: auto;
        border-spacing: 0;
        border-collapse: collapse;
      }
      tr {
        background-color: #fff;
        border-top: 1px solid #c6cbd1;
      }
      tr:nth-child(2n) {
        background-color: #f6f8fa;
      }
      th,
      td {
        padding: 6px 13px;
        border: 1px solid #dfe2e5;
      }
    </style>
  </head>
  <body>
    <small>${date}</small>
    <table>
      <thead>
        <tr>
          <th>Treno</th>
          <th>Dalle ore</th>
          <th>Per</th>
          <th>Ritardo</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${trains
          .map(
            train => `<tr>
            <td>${train.treno}</td>
            <td>${train.partenza}</td>
            <td>${train.per}</td>
            <td>${train.ritardo}</td>
            <td>${train.status}</td>
          </tr>`
          )
          .join('')}
      </tbody>
    </table>
  </body>
</html>`
}

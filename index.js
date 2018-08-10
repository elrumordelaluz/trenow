const fetch = require('node-fetch')

module.exports = async () => {
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
      'dalle ore': compOrarioPartenza,
      per: destinazione,
      ritardo: compRitardo[0],
      status: compInStazionePartenza[0],
    })
  )

  return trains
}

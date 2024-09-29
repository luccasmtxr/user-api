
export async function getCep(cep: string) {
  const cepResponse = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
  const cepData = await cepResponse.json()
  return {
    cep: cepData.cep,
    logradouro: cepData.logradouro,
    bairro: cepData.bairro,
    estado: cepData.uf,
    cidade: cepData.localidade,
  }
}


# atualizar-boleto
[![Build Status](https://drone.io/github.com/brasil-js/atualizar-boleto/status.png)](https://drone.io/github.com/brasil-js/atualizar-boleto/latest)

Módulo para atualização de valor do boleto bancário. Calcula multa, mora ou desconto.

### Instalação

```
npm install --save atualizar-boleto
```

### Utilização

```javascript
var atualizarBoleto = require('atualizar-boleto');

atualizarBoleto({
    valor: 100,
    vencimento: new Date('Thu Jul 10 2015 12:00:00 GMT-0300 (BRT)'),
    dataDoPagamento: new Date(),
    porcentagemDaMulta: 0.02, // 2%
    porcentagemDaMora: 0.01, // 1% ao mês
    porcentagemDoDesconto: 0.05, // 5%
    diasDeAntecipacaoParaDesconto: 5
}, function(err, valorAtualizado) {
    if(err) {
        throw err;
    }

    console.log('Valor atualizado: ', valorAtualizado);
});
```

<small>
Para o cálculo correto do valor atualizado é necessário levar
em conta os feriados e os fins de semana, pois caso o vencimento caia em um desses dias
é necessário considerar o próximo dia útil como data de vencimento.

Como é complicado "calcular" quando os feriados móveis caem e como também é
possível a criação de novos feriados, este módulo permite que você implemente a sua própria função
que responde se uma data é ou não feriado (você pode consultar seu banco de dados ou algum webservice, por exemplo).

Você **DEVE** implementar esta função ou eventualmente o valor será calculado errado
gerando prejuizo para uma das duas partes envolvidas. Veja o exemplo abaixo:
</small>

```javascript
var atualizarBoleto = require('atualizar-boleto');

function eFeriado(data, callback) {
    // Lembre-se que `data` é um objeto do moment,
    // se quiser trabalhar com um objeto de data do JavaScript
    // adicione a linha; data = data.toDate();

    if(data.day() === 0 || data.day() === 6) {
        return callback(null, true); // É sábado ou domingo
    }

    var select = bancoDeDados.select([
        'SELECT * FROM feriados WHERE data=',
        data.format('DD/MM/YYYY')
    ].join(''));

    select.complete(function(err, feriados) {
        if(err) {
            return callback(err);
        }

        callback(null, feriados.length);
    });
}

atualizarBoleto({
    valor: 100,
    vencimento: new Date('Thu Jul 10 2015 12:00:00 GMT-0300 (BRT)'),
    dataDoPagamento: new Date(),
    porcentagemDaMulta: 0.02, // 2%
    porcentagemDaMora: 0.01, // 1% ao mês
    porcentagemDoDesconto: 0.05, // 5%
    diasDeAntecipacaoParaDesconto: 5,
    eFeriado: eFeriado // Informe aqui a sua função
}, function(err, valorAtualizado) {
    if(err) {
        throw err;
    }

    console.log('Valor atualizado: ', valorAtualizado);
});

```

### Projetos Relacionados
- [Brasil](https://github.com/gammasoft/brasil)
  Biblioteca de ferramentas utilitárias voltadas para programadores brasileiros.

- [Inscrição Estadual](https://github.com/gammasoft/ie)
  Biblioteca de validação de inscrições estaduais em JavaScript (browser e node.js)

- [DANFE](https://github.com/brasil-js/danfe)
  Módulo node.js para gerar DANFEs em .pdf

### Contribuições

- Execute `npm test` antes de enviar pull requests, tenha certeza que todos os testes estão passando.
- Envie bitcoins para 1MCMHhGyjK72CMsRG4yD2SsPCQ7haQDhPG

### Licença MIT

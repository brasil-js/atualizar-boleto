var async = require('async'),
    Money = require('bigmoney.js'),
    Big = require('big.js'),
    moment = require('moment');

function eFeriadoDefault(data, callback) {
    return callback(null, data.day() === 0 || data.day() === 6);
}

function atualizarBoletoBancario(parametros, callback) {
    var data = moment(parametros.dataDoPagamento).endOf('day'),
        vencimento = moment(parametros.vencimento).endOf('day'),
        valorDevido = new Money(parametros.valor),
        porcentagemDaMulta = new Big(parametros.porcentagemDaMulta || 0),
        porcentagemDaMora = new Big(parametros.porcentagemDaMora || 0).div(30),
        porcentagemDoDesconto = new Big(parametros.porcentagemDoDesconto || 0),
        diasDeAntecipacaoParaDesconto = parametros.diasDeAntecipacaoParaDesconto * -1,
        eFeriado = parametros.eFeriado || eFeriadoDefault,
        intervalo;

    function obterVencimentoConsiderado(callback) {
        var vencimentoConsiderado = moment(vencimento),
            formato = 'DD/MM/YYYY';

        async.during(function(cb) {
            eFeriado(vencimentoConsiderado, cb);
        }, function(cb) {
            vencimentoConsiderado.add(1, 'day');
            cb();
        }, function(err) {
            if(err) {
                return callback(err);
            }

            if(data.format(formato) === vencimentoConsiderado.format(formato)) {
                return callback(null, vencimentoConsiderado);
            }

            callback(null, vencimento);
        });
    }

    obterVencimentoConsiderado(function(err, vencimento) {
        if(err) {
            return callback(err);
        }

        intervalo = vencimento.diff(data, 'days', true);
        intervalo = Math.round(intervalo) * -1;

        if(intervalo > 0) {
            var valorDaMulta = new Money(porcentagemDaMulta.times(valorDevido)),
                valorDaMora = new Money(porcentagemDaMora.times(valorDevido)).round(2);

            valorDevido = valorDevido.plus(valorDaMulta);
            valorDevido = valorDevido.plus(valorDaMora.times(intervalo));
        }

        if(intervalo < 0 && intervalo <= diasDeAntecipacaoParaDesconto) {
            valorDoDesconto = new Money(porcentagemDoDesconto.times(valorDevido));
            valorDevido = valorDevido.minus(valorDoDesconto);
        }

        valorDevido = parseFloat(valorDevido.valueOf());
        callback(null, valorDevido);
    });
}

module.exports = atualizarBoletoBancario;

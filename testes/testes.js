'use strict';

var atualizarBoleto = require('../index');

module.exports = {
    'Pagamento efetuado na data de vencimento não tem acréscimo nem desconto': function(test) {
        var parametros = {
            dataDoPagamento: new Date('2015-07-06T15:25:07.138Z'),
            valor: 100,
            vencimento: '2015-07-06T15:25:07.138Z',
            porcentagemDaMulta: 0.02,
            porcentagemDaMora: 0.01
        };

        atualizarBoleto(parametros, function(err, valorDevidoNaData) {
            test.ifError(err);
            test.equal(valorDevidoNaData, 100);
            test.done();
        });
    },

    'Pagamento atrasado tem adição de multa e de mora': function(test) {
        var parametros = {
            dataDoPagamento: new Date('2015-07-07T15:25:07.138Z'),
            valor: 100,
            vencimento: '2015-07-06T15:25:07.138Z',
            porcentagemDaMulta: 0.02,
            porcentagemDaMora: 0.01
        };

        atualizarBoleto(parametros, function(err, valorDevidoNaData) {
            test.ifError(err);
            test.equal(valorDevidoNaData, 102.03);
            test.done();
        });
    },

    'Pagamento atrasado tem adição de multa e de mora 2': function(test) {
        var parametros = {
            dataDoPagamento: new Date('2015-06-24T03:00:00.000Z'),
            valor: 336.91,
            vencimento: '2015-06-21T03:00:00.000Z',
            porcentagemDaMulta: 0.02,
            porcentagemDaMora: 0.01
        };

        atualizarBoleto(parametros, function(err, valorDevidoNaData) {
            test.ifError(err);
            test.equal(valorDevidoNaData, 343.98);
            test.done();
        });
    },

    'Pagamento atrasado tem adição de multa e de mora 3': function(test) {
        var parametros = {
            dataDoPagamento: new Date('2015-06-24T03:00:00.000Z'),
            valor: 360.02,
            vencimento: '2015-06-18T03:00:00.000Z',
            porcentagemDaMulta: 0.02,
            porcentagemDaMora: 0.01
        };

        atualizarBoleto(parametros, function(err, valorDevidoNaData) {
            test.ifError(err);
            test.equal(valorDevidoNaData, 367.94);
            test.done();
        });
    },

    'Pagamento atrasado tem adição de multa e de mora 4': function(test) {
        var parametros = {
            dataDoPagamento: new Date('2015-06-24T03:00:00.000Z'),
            valor: 169.64,
            vencimento: '2015-06-19T03:00:00.000Z',
            porcentagemDaMulta: 0.02,
            porcentagemDaMora: 0.01
        };

        atualizarBoleto(parametros, function(err, valorDevidoNaData) {
            test.ifError(err);
            test.equal(valorDevidoNaData, 173.33);
            test.done();
        });
    },

    'Pagamento atrasado tem adição de multa e de mora 5': function(test) {
        var parametros = {
            dataDoPagamento: new Date('2015-06-24T03:00:00.000Z'),
            valor: 365.93,
            vencimento: '2015-06-21T03:00:00.000Z',
            porcentagemDaMulta: 0.02,
            porcentagemDaMora: 0.01
        };

        atualizarBoleto(parametros, function(err, valorDevidoNaData) {
            test.ifError(err);
            test.equal(valorDevidoNaData, 373.61);
            test.done();
        });
    },

    'Pagamento atrasado tem adição de multa e de mora 6': function(test) {
        var parametros = {
            dataDoPagamento: new Date('2015-06-24T03:00:00.000Z'),
            valor: 370.66,
            vencimento: '2015-06-21T03:00:00.000Z',
            porcentagemDaMulta: 0.02,
            porcentagemDaMora: 0.01
        };

        atualizarBoleto(parametros, function(err, valorDevidoNaData) {
            test.ifError(err);
            test.equal(valorDevidoNaData, 378.43);
            test.done();
        });
    },

    'Pagamento adiantado mas depois do prazo do desconto 1': function(test) {
        var parametros = {
            dataDoPagamento: new Date('2015-06-23T03:00:00.000Z'),
            valor: 100,
            vencimento: '2015-06-24T03:00:00.000Z',
            porcentagemDaMulta: 0.02,
            porcentagemDaMora: 0.01,
            diasDeAntecipacaoParaDesconto: 3,
            porcentagemDoDesconto: 0.1
        };

        atualizarBoleto(parametros, function(err, valorDevidoNaData) {
            test.ifError(err);
            test.equal(valorDevidoNaData, 100);
            test.done();
        });
    },

    'Pagamento adiantado mas depois do prazo do desconto 2': function(test) {
        var parametros = {
            dataDoPagamento: new Date('2015-06-22T03:00:00.000Z'),
            valor: 100,
            vencimento: '2015-06-24T03:00:00.000Z',
            porcentagemDaMulta: 0.02,
            porcentagemDaMora: 0.01,
            diasDeAntecipacaoParaDesconto: 3,
            porcentagemDoDesconto: 0.1
        };

        atualizarBoleto(parametros, function(err, valorDevidoNaData) {
            test.ifError(err);
            test.equal(valorDevidoNaData, 100);
            test.done();
        });
    },

    'Pagamento adiantado tem desconto aplicado corretamente 1': function(test) {
        var parametros = {
            dataDoPagamento: new Date('2015-06-21T03:00:00.000Z'),
            valor: 100,
            vencimento: '2015-06-24T03:00:00.000Z',
            porcentagemDaMulta: 0.02,
            porcentagemDaMora: 0.01,
            diasDeAntecipacaoParaDesconto: 3,
            porcentagemDoDesconto: 0.1
        };

        atualizarBoleto(parametros, function(err, valorDevidoNaData) {
            test.ifError(err);
            test.equal(valorDevidoNaData, 90);
            test.done();
        });
    },

    'Pagamento adiantado tem desconto aplicado corretamente 2': function(test) {
        var parametros = {
            dataDoPagamento: new Date('2015-06-20T03:00:00.000Z'),
            valor: 100,
            vencimento: '2015-06-24T03:00:00.000Z',
            porcentagemDaMulta: 0.02,
            porcentagemDaMora: 0.01,
            diasDeAntecipacaoParaDesconto: 3,
            porcentagemDoDesconto: 0.1
        };

        atualizarBoleto(parametros, function(err, valorDevidoNaData) {
            test.ifError(err);
            test.equal(valorDevidoNaData, 90);
            test.done();
        });
    },

    'Pagamento adiantado tem desconto aplicado corretamente 3': function(test) {
        var parametros = {
            dataDoPagamento: new Date('2015-06-20T03:00:00.000Z'),
            valor: 100,
            vencimento: '2015-06-24T03:00:00.000Z',
            porcentagemDaMulta: 0.02,
            porcentagemDaMora: 0.01,
            diasDeAntecipacaoParaDesconto: 3,
            porcentagemDoDesconto: 0.1
        };

        atualizarBoleto(parametros, function(err, valorDevidoNaData) {
            test.ifError(err);
            test.equal(valorDevidoNaData, 90);
            test.done();
        });
    },

    'Quando vencimento cai no fim de semana e é pago no primeiro dia util subsequente não é cobrado multa 1': function(test) {
        var parametros = {
            dataDoPagamento: new Date('2015-06-29T03:00:00.000Z'),
            valor: 100,
            vencimento: '2015-06-27T03:00:00.000Z', // Sábado
            porcentagemDaMulta: 0.02,
            porcentagemDaMora: 0.01,
            diasDeAntecipacaoParaDesconto: 3,
            porcentagemDoDesconto: 0.1
        };

        atualizarBoleto(parametros, function(err, valorDevidoNaData) {
            test.ifError(err);
            test.equal(valorDevidoNaData, 100);
            test.done();
        });
    },

    'Quando vencimento cai no fim de semana e é pago no primeiro dia util subsequente não é cobrado multa 2': function(test) {
        var parametros = {
            dataDoPagamento: new Date('2015-06-29T03:00:00.000Z'),
            valor: 100,
            vencimento: '2015-06-28T03:00:00.000Z', // Domingo
            porcentagemDaMulta: 0.02,
            porcentagemDaMora: 0.01,
            diasDeAntecipacaoParaDesconto: 3,
            porcentagemDoDesconto: 0.1
        };

        atualizarBoleto(parametros, function(err, valorDevidoNaData) {
            test.ifError(err);
            test.equal(valorDevidoNaData, 100);
            test.done();
        });
    },

    'Quando vencimento cai no fim de semana mas não é pago no primeiro dia util subsequente é cobrado multa normalmente 1': function(test) {
        var parametros = {
            dataDoPagamento: new Date('2015-06-30T03:00:00.000Z'),
            valor: 100,
            vencimento: '2015-06-27T03:00:00.000Z', // Sábado
            porcentagemDaMulta: 0.02,
            porcentagemDaMora: 0.01,
            diasDeAntecipacaoParaDesconto: 3,
            porcentagemDoDesconto: 0.1
        };

        atualizarBoleto(parametros, function(err, valorDevidoNaData) {
            test.ifError(err);
            test.equal(valorDevidoNaData, 102.09);
            test.done();
        });
    },

    'Quando vencimento cai no fim de semana mas não é pago no primeiro dia util subsequente é cobrado multa normalmente 2': function(test) {
        var parametros = {
            dataDoPagamento: new Date('2015-06-30T03:00:00.000Z'),
            valor: 100,
            vencimento: '2015-06-28T03:00:00.000Z', // Sábado
            porcentagemDaMulta: 0.02,
            porcentagemDaMora: 0.01,
            diasDeAntecipacaoParaDesconto: 3,
            porcentagemDoDesconto: 0.1
        };

        atualizarBoleto(parametros, function(err, valorDevidoNaData) {
            test.ifError(err);
            test.equal(valorDevidoNaData, 102.06);
            test.done();
        });
    },

    'Verifica que é possível passar função para calculo de feriados': function(test) {
        var eFeriadoFoiChamado = false;

        var eFeriado = function(data, callback) {
            eFeriadoFoiChamado = true;
            callback(null, data.format('DD/MM/YYYY') === '29/06/2015');
        };

        var parametros = {
            dataDoPagamento: new Date('2015-06-30T03:00:00.000Z'),
            valor: 100,
            vencimento: '2015-06-29T03:00:00.000Z', // Domingo
            porcentagemDaMulta: 0.02,
            porcentagemDaMora: 0.01,
            diasDeAntecipacaoParaDesconto: 3,
            porcentagemDoDesconto: 0.1,
            eFeriado: eFeriado
        };

        atualizarBoleto(parametros, function(err, valorDevidoNaData) {
            test.ifError(err);
            test.ok(eFeriadoFoiChamado);
            test.equal(valorDevidoNaData, 100);
            test.done();
        });
    }
};











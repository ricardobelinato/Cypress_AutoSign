import { gerarNomeESobrenome, gerarNomeCompleto, gerarEmail, gerarCelular, gerarCPF, gerarDataNascimentoMaior, gerarDataNascimentoMenor, gerarCep, gerarRG, gerarCNPJ } from '../dataGenerator';

const { CANDIDATO } = require('../../config/configSpec');

const { nomeAleatorio, sobrenomeAleatorio } = gerarNomeESobrenome();
const nomeCompletoAleatorio = gerarNomeCompleto(nomeAleatorio, sobrenomeAleatorio);
const emailAleatorio = gerarEmail(nomeAleatorio, sobrenomeAleatorio);
const celularAleatorio = gerarCelular();
const CPFAleatorio = gerarCPF();
let dataNascimento;
const cepAleatorio = gerarCep();
const RGAleatorio = gerarRG();
const CNPJAleatorio = gerarCNPJ();

describe('Varredura de campos', () => {
    before(() => {
        if (CANDIDATO().idade == "+") {
            dataNascimento = gerarDataNascimentoMaior();
        }
        if (CANDIDATO().idade == "-") {
            dataNascimento = gerarDataNascimentoMenor();
        }
    });

    it('Leitura e preenchimento dos campos do primeiro passo da inscrição', () => {
        cy.document().then((doc) => {
            const labels = [
                { text: 'Nome completo *', value: nomeCompletoAleatorio },
                { text: 'E-mail *', value: emailAleatorio },
                { text: 'Celular *', value: celularAleatorio },
                { text: 'CPF *', value: CPFAleatorio },
                { text: 'Data de nascimento *', value: dataNascimento }
            ];

            labels.forEach(labelObj => {
                const label = Array.from(doc.querySelectorAll('label')).find(el => el.textContent.includes(labelObj.text));
                if (label) {
                    cy.wrap(label).parent().find('input').filter(':visible').first().then(input => {
                        cy.wrap(input).type(labelObj.value);
                    });
                } else {
                    cy.log(`O label "${labelObj.text}" não existe no DOM`);
                }
            });
        });
    });

    it('Marcação dos campos radio e checkbox', () => {
        cy.get(`input[type="radio"][value="${CANDIDATO().sexo}"]`, { log: false }).then($campo => {
            if ($campo.length > 0) {
                cy.wrap($campo).check({ force: true });
            }
        })
        cy.get(`input[type="radio"][value="${CANDIDATO().nacionalidade}"]`, { log: false }).then($campo => {
            if ($campo.length > 0) {
                cy.wrap($campo).check({ force: true });
            }
        });

        cy.get('input[type="checkbox"]').eq(1).check({ force: true })
    });

    it('Exibição de campos ocultos do primeiro passo da inscrição', () => {
        cy.window().then((win) => {
            let i = 0;
            while (i < 10) {
                Array.from(win.document.getElementsByClassName('fields-hidden')).forEach((e) => {
                    e.classList.remove('fields-hidden');
                });
                Array.from(win.document.getElementsByClassName('ps-input-hidden')).forEach((e) => {
                    e.classList.remove('ps-input-hidden');
                });

                i++;
            }
        });
    })

    it('Conclusão do primeiro passo da inscrição', () => {
        // cy.get('button').contains('Avançar').click();
    })
});
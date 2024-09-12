import { gerarNomeESobrenome, gerarNomeCompleto, gerarEmail, gerarCelular, gerarCPF, gerarDataNascimentoMaior, gerarDataNascimentoMenor, gerarCep, gerarRG, gerarCNPJ} from '../dataGenerator';

const { nomeAleatorio, sobrenomeAleatorio } = gerarNomeESobrenome();
const nomeCompletoAleatorio = gerarNomeCompleto(nomeAleatorio, sobrenomeAleatorio);
const emailAleatorio = gerarEmail(nomeAleatorio, sobrenomeAleatorio);
const celularAleatorio = gerarCelular();
const CPFAleatorio = gerarCPF();
const dataNascimentoMaior = gerarDataNascimentoMaior();
const dataNascimentoMenor = gerarDataNascimentoMenor();
const cepAleatorio = gerarCep();
const RGAleatorio = gerarRG();
const CNPJAleatorio = gerarCNPJ();
let numCamposPreenchidos = 0;

describe('Varredura de campos', () => {
    it('Primeiro passo da inscrição', () => {
        cy.get('div').each(($div) => {
            if ($div.hasClass('nomeCompleto')) {
                cy.wrap($div).find('input').type(nomeCompletoAleatorio);
                numCamposPreenchidos += 1;
            }
            if ($div.hasClass('email')) {
                cy.wrap($div).find('input').type(emailAleatorio);
                numCamposPreenchidos += 1;
            }
            if ($div.hasClass('celular')) {
                cy.wrap($div).find('input').type(celularAleatorio);
                numCamposPreenchidos += 1;
            }
            if ($div.hasClass('cpfRespInsc') || $div.hasClass('cpfCandidato')) {
                cy.wrap($div).find('input').type(CPFAleatorio);
                numCamposPreenchidos += 1;
            }
            if ($div.hasClass('dataNascimento')) {
                cy.wrap($div).find('input[type="text"]').type(dataNascimentoMaior);
                numCamposPreenchidos += 1;
            }
        }).then(() => {
            if (numCamposPreenchidos == 0) {
                cy.document().then((doc) => {
                    const labels = [
                        { text: 'Nome completo *', value: nomeCompleto },
                        { text: 'E-mail *', value: emailAleatorio },
                        { text: 'Celular *', value: telefoneAleatorio },
                        { text: 'CPF *', value: cpfAleatorio },
                        { text: 'Data de Nascimento *', value: dataNascimentoMaior }
                    ];

                    labels.forEach(labelObj => {
                        const label = Array.from(doc.querySelectorAll('label')).find(el => el.textContent.includes(labelObj.text));
                        if (label) {
                            cy.wrap(label).parent().find('input').type(labelObj.value);
                        } else {
                            cy.log(`O label "${labelObj.text}" não existe no DOM`);
                        }
                    });
                });
            }
        });
    
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

    cy.get('.form-check-input').eq(1).check({ force: true })
    // cy.get('button').contains('Avançar').click();

});
    // it('Segundo passo da inscrição', () => {

    // });
});
describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  
  it('verifica o título da aplicação', () => {
    cy.title('').should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('testeQAtesteQAtesteQA testeQAtesteQAtesteQA testeQAtesteQAtesteQA', 5)

    cy.get('#firstName').type('Ozeias')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('ozeias.ssilva@gmail.com')
    cy.get('#open-text-area').type(longText)
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
   
    cy.get('#firstName').type('Ozeias')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('ozeias.ssilva&gmail.com')
    cy.get('#open-text-area').type('Obrigado')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  
  it('campo telefone errado', () => {
   
    cy.get('#phone')
       .type('abc')
       .should('have.value' , '')
 
  })

  it('exibe mensagem de erro quando telefone não for preenchido corretamente', () => {
   
    cy.get('#firstName').type('Ozeias')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('ozeias.ssilva&gmail.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('Obrigado')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
 
  })

  it('preenche e limpa os campos nome, sobrenome e telefone', () => {
   
    cy.get('#firstName')
      .type('Ozeias')
      .should('have.value', 'Ozeias')
      .clear()
      .should('have.value', '')
  })

  it('clicar em enviar, sem preencher os campos obrigat´rorios', () => {
   
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
 
  })

  it('seleciono o produto youtube', () => {
    cy.get('#product')
      .select('YouTube')
  })

  it('seleciono o produto pelo valor', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })


  it('seleciono o produto pelo indice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })


  it('marca o tipo de atendimento feedback', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
      
  })

  it('fazendo uppload de arquivo', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should( input =>{
        expect(input[0].files[0].name).to.equal('example.json')
      })
      
  })

  it.only('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
  cy.contains('a', 'Política de Privacidade')
    .should('have.attr', 'href', 'privacy.html')
    .and('have.attr', 'target', '_blank')
  })


  // it.only('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique em outra aba', () => {
  //   cy.contains('a', 'Política de Privacidade')
  //     .invoke('removeAttr',  'target')
  //     .click()

  //   cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be_visible')  
     
  //   })




})



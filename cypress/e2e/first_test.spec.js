
/// <reference types='cypress'/>
describe('Our first suite', () =>{

    it('first test', () =>{ //we can have as meny 'it's as we need

        cy.visit('/')//it is located in cypress.config.js
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //by tag name
        cy.get('input')
        //by id
        cy.get('#inputEmail1')
        //by class name
        cy.get('.input-full-width')
        //by attribute name
        cy.get('[placeholder]')
        //by attribute name and value
        cy.get('[placeholder="Email"]')
        //by class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')
        //by Tag name and Attribute with value
        cy.get('input[placeholder="Email"]')
        //by two different attributes and names
        cy.get('[placeholder="Email"][fullwidth]')
        cy.get('[fullwidth][type="email"]')
        //by Tag Name, Attribute with value, Class Name and ID
        cy.get('input[placeholder="Email"].input-full-width#inputEmail1')
        //The most recomanded way by Cypress:
        cy.get('[data-cy="imputEmail1"') //we can add our own attributes 
        //in source code, it's very easy and usefull. Nobody touch that and it will 
        //always work
        //here we can use loupe to search that part of html structure in our project, and then add that specific attribut
    })

//next lesson

    it('second test',()=>{

        cy.visit('/')//it is located in cypress.config.js
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get('[data-cy="sign-in-button"]') //i've added specjal attribute to this button, called 
        //data-cy, with value "sign-in-button"
        cy.contains('Sign in') //that method showes us first element which contains 'Sign in text'. 
        //Also we see SIGN IN button, but it contains front stylesheets. We need to always 
        //look into locator in DOM, it means that we can see uppercase on button, but in DOM it could be small letters
        cy.contains('[status="warning"]','Sign in') //we can also search for the web element that is not first in line
        //element with a text 'Sign in'. We must just use additional attribute with value. 
        cy.get('#inputEmail3')
            .parents('form')
            .find('button') //that method is only to find child element inside of the parents element from the 
            //current key element which you are in.
            .should('contain', 'Sign in') //assertion 
            .parents('form')
            .find('span.custom-checkbox').click()

        cy.contains('nb-card','Horizontal form').find('#inputEmail3')

    })

//next lesson

    it('then and wrap methods',()=>{


        cy.visit('/')//it is located in cypress.config.js
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()


        cy.contains('nb-card','Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.contains('nb-card','Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')

        cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain','Email address')
        cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')
        
        //const firstForm = cy.contains('nb-card','Using the Grid') //bad idea
        //const secondForm = cy.contains('nb-card', 'Basic form') //bad idea
        //we cannot save the contekst, or asign the result of cypress command to value
        //cypress style

        cy.contains('nb-card','Using the Grid').then(firstForm => { //not cypress object, it's JQuery syntax.
            //we are able to save the result of this function. If there is a Cypress method, 
            //there is no way to save the result and use this result in the future cases, which is why we use function with patrameter firstForm
            const emaillabelFirst = firstForm.find('[for="inputEmail1"]').text()
            const passwordlabelFirst = firstForm.find('[for="inputPassword2"]').text() //if we use JQuery format we can't use Cypress methods, like click()
            expect(emaillabelFirst).to.equal('Email')
            expect(passwordlabelFirst).to.equal('Password')

                cy.contains('nb-card', 'Basic form').then(secondForm => {
                const passwordLabel2 = secondForm.find('[for="exampleInputPassword1"]').text()
                expect(passwordlabelFirst).to.equal(passwordLabel2)

                cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')
        })

    })
   
})

// next lesson 

    it('invoke command 1', ()=>{

        cy.visit('/')//it is located in cypress.config.js
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //1 (from previous lesson)

        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

        //2 (from previous lesson too)

        cy.get('[for="exampleInputEmail1"]').then(Email_label =>{
            expect(Email_label.text()).to.equal('Email address')
        } )

        //3

        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text =>{ //we use invoke, save as a parametr  
            //which we need to invoke, and then we use it to logic in our test
                expect(text).to.equal('Email address')
        })

        //4.

        cy.contains('nb-card', 'Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr', 'class')
            //.should('contain', 'checked') //or
            .then(class_value =>{
                expect(class_value).to.contain('checked')
            })
            
})

    it('assert property', ()=>{

        cy.visit('/')//it is located in cypress.config.js
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        let date = new Date() //getting current system date and time 
        date.setDate(date.getDate() + 20)

        let futureDay = date.getDate() //that object is getting current system date and time 
        let futureMonth = date.toLocaleString('default', {month: 'short'})       

        cy.contains('nb-card','Common Datepicker').find('input').then( input =>{
        cy.wrap(input).click() 
        //cy.get('nb-calendar-day-picker').contains('17').click()
        //cy.wrap(input).invoke('prop','value').should('contain', 'Aug 17, 2023') //assert properties
                
        //selectDayFromCurrent()
        //function selectDayFromCurrent(){
            //this is function for mor than 35 days+
                cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute =>{
                    if(![dateAttribute.includes(futureMonth)]){
                        cy.get('[data-name="chevron-right"]').click()
                        cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
                        //selectDayFromCurrent()
                    } else {
                        cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click() //[class="day-cell ng-star-inserted"]
                        
                        }
                    })
                //}
            })
        })

//next lesson

    it('radio buttons', ()=>{

        cy.visit('/')//it is located in cypress.config.js
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons =>{
            cy.wrap(radioButtons)
                .first() //first radiobutton 
                .check({force: true}) //a new method, and we force Cypress to check this element, even it is hidden  
                .should('be.checked')
            cy.wrap(radioButtons)
                .eq(1)//by the index
                .check({force: true})

            cy.wrap(radioButtons)
                .eq(0) //or .first()
                .should('not.be.checked')

            cy.wrap(radioButtons)
                .eq(2)
                .should('be.disabled') //because it's not clickable
        })
    })

    it('Check boxes', ()=> {

        cy.visit('/')//it is located in cypress.config.js
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        cy.get('[type="checkbox"]').check({force: true}) //if some of elements are alredy checked,
        //check method will not unchecked them
        cy.get('[type="checkbox"]').eq(0).click({force: true})
        //summarize: check() is a method that you can use only for elements of type check boxes or radio buttons
        
    })

    it.only('Lists and dropdowns', ()=>{
        cy.visit('/')//it is located in cypress.config.js
        //1
        //cy.get('nav nb-select').click()
        //cy.get('.options-list').contains('Dark').click()
        //cy.get('nav nb-select').should('contain', 'Dark')
        //cy.get('nb-layout-header nav ').should('have.css', 'background-color','rgb(34, 43, 69)')

        //2

        cy.get('nav nb-select').then( dropdown =>{
            cy.wrap(dropdown).click()
            cy.get('.options-list nb-option').each((listItem, index) =>{
                const itemText = listItem.text().trim() //trim is for remove the spaces in text values
                const colours = {
                    "Light":"rgb(255, 255, 255)",
                    "Dark":"rgb(34, 43, 69)",
                    "Cosmic":"rgb(50, 50, 89)",
                    "Corporate":"rgb(255, 255, 255)"                }
                cy.wrap(listItem).click()
                cy.wrap(dropdown).should('contain', itemText)
                cy.get('nb-layout-header nav ').should('have.css', 'background-color',colours[itemText])
                
                if(index<3){
                    cy.wrap(dropdown).click()
                }
                //in that type of cases we can also use cy.select. We didn't used it
                //because our tag name is 'nb-select', not 'select'. This method will not work in this case
            })
        })
    

    })

        it('Smart table', ()=>{

            cy.visit('/')//it is located in cypress.config.js
            cy.contains('Tables & Data').click()
            cy.contains('Smart Table').click()
        //1
            cy.get('tbody').contains('tr', 'Larry').then(tableRow =>{
                cy.wrap(tableRow).find('.nb-edit').click()
                cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
                cy.wrap(tableRow).find('.nb-checkmark').click()
                cy.wrap(tableRow).find('td').eq(6).should('contain', '25')
        //2
            cy.get('thead').find('.nb-plus').click()
            cy.get('thead').find('tr').eq(2).then(newTableRow =>{
                cy.wrap(newTableRow).find('[placeholder="First Name"]').type('Karolina')
                cy.wrap(newTableRow).find('[placeholder="Last Name"]').type('Brylowska')
                cy.wrap(newTableRow).find('.nb-checkmark').click()
            
        })

            cy.get('tbody').find('tr').eq(0).then(thatNewTableRow =>{
                cy.wrap(thatNewTableRow).find('td').eq(2).should('contain', 'Karolina')
                cy.wrap(thatNewTableRow).find('td').eq(3).should('contain', 'Brylowska')
        })

        //3
            const age = [20, 30, 40, 12]
            cy.wrap(age).each(age=>{
                cy.get('thead').find('[placeholder="Age"]').clear().type(age)
                cy.wait(500)
                cy.get('tbody tr').each(tableRow=>{

                    if(age==12){
                    cy.wrap(tableRow).find('td').should('contain', 'No data found')
                    }else{
                    cy.wrap(tableRow).find('td').eq(6).should('contain', age)
                    }
                })
            })
        })
    })



})




    




   



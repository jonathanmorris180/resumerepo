import { createElement } from 'lwc';
// Import the component you want to test
import helloWorld from 'c/helloWorld';

// The describe function creates a test suite
describe('c-hello-world', () => {
    // afterEach runs after each test method to clean up the DOM
    afterEach(() => {
        while(document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });
    // 'it' describes a single test
    it('displays greeting', () => {
        const element = createElement('c-hello-world', {
            is:helloWorld
        });
        document.body.appendChild(element);
        const pTag = element.shadowRoot.querySelector('p');
        expect(pTag.textContent).toBe('Hello World!');
    });

    it('renders with Hello Matt', () => {
        const element = createElement('c-hello-world', {
            is:helloWorld
        });
        // set the 'person' variable to 'Matt'
        element.person = "Matt";
        document.body.appendChild(element);
        const pTag = element.shadowRoot.querySelector('p');
        expect(pTag.textContent).toBe('Hello Matt!');
    });
});
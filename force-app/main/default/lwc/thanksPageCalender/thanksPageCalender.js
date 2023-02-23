import { LightningElement } from 'lwc';
import thankYouImage from '@salesforce/resourceUrl/thankYouImage';

export default class ThanksPage extends LightningElement {
    logo = thankYouImage;
    connectedCallback(){
    setTimeout(() => {
        window.location.assign("https://d2v000002fkjpeas--partial.sandbox.my.salesforce-sites.com/CalenderHomePage");
      }, "2000")
    }
}
import { LightningElement,track,wire ,api } from 'lwc';

export default class CalenderHomePageComponent extends LightningElement { 
    @track displayMonth;
    @track displayYear;
    @track weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    @track dates = [];

    connectedCallback() {
        this.displayCurrentMonth();
    }

    displayCurrentMonth() {
        const today = new Date();
        this.displayMonth = today.toLocaleString('default', { month: 'long' });
        this.displayYear = today.getFullYear();
        this.generateCalendarDates();
    }

    previousMonth() {
        const currentDate = new Date(`${this.displayMonth} 1, ${this.displayYear}`);
        currentDate.setMonth(currentDate.getMonth() - 1);
        this.displayMonth = currentDate.toLocaleString('default', { month: 'long' });
        this.displayYear = currentDate.getFullYear();
        this.generateCalendarDates();
       
    }

    nextMonth() {
        const currentDate = new Date(`${this.displayMonth} 1, ${this.displayYear}`);
        currentDate.setMonth(currentDate.getMonth() + 1);
        this.displayMonth = currentDate.toLocaleString('default', { month: 'long' });
        this.displayYear = currentDate.getFullYear();
        this.generateCalendarDates();
     
    }

    generateCalendarDates() {
        this.dates = [];
        const currentDate = new Date(`${this.displayMonth} 1, ${this.displayYear}`);
        const daysInMonth = new Date(this.displayYear, currentDate.getMonth() + 1, 0).getDate();
        const firstDayOfMonth = currentDate.getDay();
        console.log('firstday-->' + firstDayOfMonth);
        for (let i = 0; i < firstDayOfMonth; i++) {
            this.dates.push({ day: '', className: 'empty',flag:false });
            
        }
        for (let i = 1; i <= daysInMonth; i++) {
            this.dates.push({ day: i, className: '' ,flag:true});
        }

        for(let j = 0; j < this.dates.length;j++){
        console.log('Actual dates-->' +this.dates[j].flag)
    }
}
@track finaldateformodal;
@track data ;
@track val = false;
@track monthss;
@track yearss;
@track room1= false;
@track room2= false;
@track arr=[];
// connectedCallback(){
//     for(var i =9;i < 20;i++){
//         for(var j =0;j < 60;j+5){
//             this.arr.push({
//                 label : i+":"+j,value:i+":"+j
//             })
         
          
//         }  
//       }
//       console.log('arr'+ this.arr);
// }
get options() {
     var arr = [
                {label: '9:00', value:'9:00' },{label:'9:15 ',value :'9:15 '},{label:'9:30 ',value :'9:30 '},{label:'9:45 ',value :'9:45 '},
                {label:'10:00',value :'10:00'},{label:'10:15 ',value :'10:15 '},{label:'10:30 ',value :'10:30 '},{label:'10:45 ',value :'10:45 '},
                {label:'11:00', value:'11:00' },{label:'11:15 ',value :'11:15 '},{label:'11:30 ',value :'11:30 '},{label:'11:45 ',value :'11:45 '},
                {label:'12:00',value :'12:00'},{label:'12:15 ',value :'12:15 '},{label:'12:30 ',value :'12:30 '},{label:'12:45 ',value :'12:45 '},
                {label:'13:00', value:'13:00' },{label:'13:15 ',value :'13:15 '},{label:'13:30 ',value :'13:30 '},{label:'13:45 ',value :'13:45 '},
                {label:'14:00',value :'14:00'},{label:'14:15 ',value :'14:15 '},{label:'14:30 ',value :'14:30 '},{label:'14:45 ',value :'14:45 '},
                {label:'15:00', value:'15:00' },{label:'15:15 ',value :'15:15 '},{label:'15:30 ',value :'15:30 '},{label:'15:45 ',value :':45 '},
                {label:'16:00',value :'16:00'},{label:'16:15 ',value :'16:15 '},{label:'16:30 ',value :'16:30 '},{label:'16:45 ',value :'16:45 '},
                {label:'17:00', value:'17:00' },{label:'17:15 ',value :'17:15 '},{label:'17:30 ',value :'17:30 '},{label:'17:45 ',value :'17:45 '},
                {label:'18:00',value :'18:00'},{label:'18:15 ',value :'18:15 '},{label:'18:30 ',value :'18:30 '},{label:'18:45 ',value :'18:45 '},
                {label:'19:00',value :'19:00'},{label:'19:15 ',value :'19:15 '},{label:'19:30 ',value :'19:30 '},{label:'19:45 ',value :'19:45 '},
    
    ];
   
      return arr;
    // return [
       
        // { label: '9 AM', value: '9 AM' },
        // { label: '10 AM', value: '10 AM' },
        // { label: '11 AM', value: '11 AM' },
        // { label: '12 PM', value: '12 PM' },
        // { label: '1 PM', value: '1 PM' },
        // { label: '2 PM', value: '2 PM' },
        // { label: '3 PM', value: '3 PM' },
        // { label: '3 PM', value: '3 PM' },
        // { label: '3 PM', value: '3 PM' },
        // { label: '3 PM', value: '3 PM' },
        // { label: '3 PM', value: '3 PM' },
        // { label: '3 PM', value: '3 PM' },
        // { label: '3 PM', value: '0' },
        // { label: '0', value: '0' },
        // { label: '0', value: '0' },
        // { label: '1', value: '1' },
        // { label: '2', value: '2' },
    // ];
}

get endOptions() {
    var arr = [
               {label:'9:15 ',value :'9:15 '},{label:'9:30 ',value :'9:30 '},{label:'9:45 ',value :'9:45 '},
               {label:'10:00',value :'10:00'},{label:'10:15 ',value :'10:15 '},{label:'10:30 ',value :'10:30 '},{label:'10:45 ',value :'10:45 '},
               {label:'11:00', value:'11:00' },{label:'11:15 ',value :'11:15 '},{label:'11:30 ',value :'11:30 '},{label:'11:45 ',value :'11:45 '},
               {label:'12:00',value :'12:00'},{label:'12:15 ',value :'12:15 '},{label:'12:30 ',value :'12:30 '},{label:'12:45 ',value :'12:45 '},
               {label:'13:00', value:'13:00' },{label:'13:15 ',value :'13:15 '},{label:'13:30 ',value :'13:30 '},{label:'13:45 ',value :'13:45 '},
               {label:'14:00',value :'14:00'},{label:'14:15 ',value :'14:15 '},{label:'14:30 ',value :'14:30 '},{label:'14:45 ',value :'14:45 '},
               {label:'15:00', value:'15:00' },{label:'15:15 ',value :'15:15 '},{label:'15:30 ',value :'15:30 '},{label:'15:45 ',value :':45 '},
               {label:'16:00',value :'16:00'},{label:'16:15 ',value :'16:15 '},{label:'16:30 ',value :'16:30 '},{label:'16:45 ',value :'16:45 '},
               {label:'17:00', value:'17:00' },{label:'17:15 ',value :'17:15 '},{label:'17:30 ',value :'17:30 '},{label:'17:45 ',value :'17:45 '},
               {label:'18:00',value :'18:00'},{label:'18:15 ',value :'18:15 '},{label:'18:30 ',value :'18:30 '},{label:'18:45 ',value :'18:45 '},
               {label:'19:00',value :'19:00'},{label:'19:15 ',value :'19:15 '},{label:'19:30 ',value :'19:30 '},{label:'19:45 ',value :'19:45 '},
               {label:'20:00',value :'20:00'},
   
   ];
  
     return arr;
}

handleChange(event) {
    this.value = event.detail.value;
}

choosedate(e){
this.val = true;
this.data = e.target.dataset.id;
this.choosedateagain(); 
}

closeModal(){
    this.val = false;
    this.template.querySelector('.modal-backdrop').style.display = 'none';
  }
  closeModalnext() {
    this.room1 = false;
    this.template.querySelector('.modal-backdrop').style.display = 'none';
   
  }
  closeModalnextagain() {
    this.room2 = false;
    this.template.querySelector('.modal-backdrop').style.display = 'none';
  }
choosedateagain(){
   let div= this.template.querySelector('.month-year');
   this.monthss = div.innerHTML;
   let finaldate =  this.data+" "+this.monthss;
   this.finaldateformodal = finaldate;
    console.log('Month-->' + this.finaldateformodal);
}

roomnumber1(){
this.room1 = true;
}

roomnumber2(){
this.room2 = true;
}
}
import { LightningElement,track,wire ,api } from 'lwc';
import storeEventdata from '@salesforce/apex/getFieldsFromEvent.storeEventdata';
import getAttendees from '@salesforce/apex/getFieldsFromEvent.getAttendees';
import getSubject from '@salesforce/apex/getFieldsFromEvent.getSubject';
import FORM_FACTOR from '@salesforce/client/formFactor';


export default class CalenderHomePageComponent extends LightningElement { 
    @track displayMonth;
    @track displayYear;
    @track weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    @track dates = [];
    @track value =[];
    @track dateset=[];
    @track variable = false;
    @track tempRec;
  
  

    connectedCallback() {
        
        this.displayCurrentMonth();
        this.handleLoad();
        
        }

        handleLoad() {
            getSubject()
                .then(result => {
                    this.tempRec = result;
                    console.log('Result===>'+ this.tempRec);
                    this.tempRec.forEach(a=>{
                        this.dateset.push({
                            'date': a.Date__c,
                            'sub' :a.Subject__c,
                            'startTime' : a.Start_Time__c,
                            'endTime':a.End_Time__c,
                            'status':a.Status__c,
                           })
                    })
                    
                    console.log('DateSet==>'+this.dateset)
                })
                
                .catch(error => {
                    this.error = error;
                });
        }
    


   
    
    // @wire(getSubject)
    // wiredAccount({error,data}){
    //      if(data){
    //         //console.log('yes');
    //        // console.log('datafromgetsubject'+data);
    //         data.forEach(a=>{
    //            // console.log(a.Subject__c);
    //           //  console.log('a.Date__c'+a.Date__c);
    //            // console.log('Checking for time starting====>' + a.Start_Time__c);
    //            this.dateset.push({
    //             'date': a.Date__c,
    //             'sub' :a.Subject__c,
    //             'startTime' : a.Start_Time__c
    //            })
    //         })
    //      }else{
    //         console.log('error1234'+error);
    //      }
    // }
    get valuedata(){
        return this.value;
    }


    @wire(getAttendees,{formFactor: FORM_FACTOR})
    wiredContact({error,data}){
         if(data){
            data.forEach(a=>{
               // console.log(a.Email__c);
                this.value.push({label:a.Name,value:a.Name});
            })
         }else{
            console.log('error'+error);
         }
    }
    get valuedata(){
        return this.value;
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
            this.dates.push({ day: '', className: 'empty',flag:false ,valuess:[]});
            
        }
        for (let i = 1; i <= daysInMonth; i++) {
            this.dates.push({ day: i, className: '' ,flag:true ,valuess:[]});
            
        }
            
            for(let l=0;l< this.dates.length;l++){
                
              //  if(l >= 0){
                for(let k =0;k < this.dateset.length;k++){
                    let sss=[];
                    console.log('dateset date check ====>'+this.dateset[k].date);
                    console.log('this.monthshdgsh'+this.displayMonth);
                    let finaldate = this.dates[l].day+" "+ this.displayMonth+" "+this.displayYear;
                    var onlydate = this.dateset[k].date;

                    
                     sss.push({
                        'recSubject':this.dateset[k].sub,
                        'recStatus':this.dateset[k].status,
                    });
                    //  sss.push(this.dateset[k].sub);
                    for(var i=0;i < sss.length;i++){
                        if(finaldate == onlydate){
                            this.dates[l].valuess.push(sss[i]);
                        }
                    }
                // if(finaldate == onlydate){
                //     this.dates[l].valuess.push(sss);
                // }
                // for(var i=0;i < sss.length;i++){
                // console.log('sss'+sss[i].recSubject);
                // console.log('sss'+sss[i].recStatus);
                // }
               // }
            }
            }
           
            //this.dates.push({ day: i, className: '' ,flag:true ,valuess:this.finalval});
        

        for(let j = 0; j < this.dates.length;j++){
            if(this.dates[j].flag == false){
                this.variable = false;
            }
            else if(this.dates[j].flag == true){
                this.variable = true;
            }
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
this.data = e.target.dataset.id;
if(this.data != undefined){
this.val = true;
}

this.choosedateagain(); 
}

closeModal(){
    this.val = false;
    this.template.querySelector('.modal-backdrop').style.display = 'none';
    location.reload();
  }
  closeModalnext() {
    this.room1 = false;
    this.template.querySelector('.modal-backdrop').style.display = 'none';
    location.reload();
  }
  closeModalnextagain() {
    this.room2 = false;
    this.template.querySelector('.modal-backdrop').style.display = 'none';
    location.reload();
  }
choosedateagain(){
   let div= this.template.querySelector('.month-year');
   this.monthss = div.innerHTML;
   let finaldate =  this.data+" "+this.monthss;
   this.finaldateformodal = finaldate;
    console.log('Month-->' + this.finaldateformodal);
    //location.reload();
}

roomnumber1(){
this.room1 = true;
}

roomnumber2(){
this.room2 = true;
}

@track addAttendees = false;

handleAddAttendees(){
    this.addAttendees = true;
    console.log('Yes I am called');
}
closeModaladdAttendees(){
    this.addAttendees = false;
    this.template.querySelector('.modal-backdrop').style.display = 'none';
    location.reload();
}
@track subject;
@track start;
@track end;
@track totalattend =[];
@track attendees="";
@track des;
@track name;
@track email;
    handlesubject(e){
    this.subject = e.target.value;
    //console.log('this.subject' +this.subject);
    }
    handleChangestart(e){
    this.start = e.target.value;
    }
    handleChangeEnd(e){
    this.end = e.target.value;
    }
    handleChangeattendees(e){
    console.log('this.attendees'+this.totalattend.length);  
    this.attendees=  e.target.value;
    if(this.totalattend.length > 0){
        let c=0;
    for(var j = 0;j < this.totalattend.length;j++){

        if(this.totalattend[j] == this.attendees){
          c++;
        }
      }
      if(c == 0){
        this.totalattend.push(this.attendees); 
      }
    }else{
        this.totalattend.push(this.attendees); 
    }
    // console.log(this.attendees);
    }
    handledescription(e){
        this.des = e.target.value;
    }
    handleName(e){
        this.name = e.target.value;
    }
    handleEmail(e){
        this.email = e.target.value
    }
    handlesubmit(){
         let checkSlot = true;
      
        // for(let i = 0;i < this.dateset.length;i++){
        //     if((this.finaldateformodal == this.dateset[i].date)){
        //         if(this.end == this.dateset[i].endTime){
        //             console.log('End Time matched');
        //         }
        //         else if(this.end < this.dateset[i].endTime && this.start >= this.dateset[i].startTime){
        //             console.log('End Time less but start time is in between');
        //         }
        //         else if(this.end < this.dateset[i].endTime && this.end > this.dateset[i].startTime){
        //             console.log('End time is over lapping with start time');
        //         }
        //         // if(this.start = this.dateset[i].startTime){
        //         //     console.log('Equal to the Start time');
        //         // }
        //         console.log('Start date==>' +this.start);
        //         console.log('StartTime Dateset date==>' +this.dateset[i].startTime);
        //         console.log('End date==>' +this.end);
        //         console.log('EndTime Dateset date==>' +this.dateset[i].endTime);

        //         // && (this.start >= this.dateset[i].startTime) && (this.end <= this.dateset[i].endTime)
        //         // checkSlot = true;
        //     }
        // }
        //  if(checkSlot == false){



        for(var g =0;g < this.dateset.length;g++){
          

            if(this.finaldateformodal == this.dateset[g].date){
            let time1 = this.start.split(':');
            let time2 = this.end.split(':');
            let time3 = this.dateset[g].startTime.split(':');
            let time4 = this.dateset[g].endTime.split(':');
            let time5 = Number(time1[0] + time1[1]);
            let time6 = Number(time2[0] + time2[1]);
            let time7 = Number(time3[0] + time3[1]);
            let time8 = Number(time4[0] + time4[1]);

            console.log('Time 1==>'+ time5,time6,time7,time8);

            if(time5 <= time7 && time5 < time6){
                if(time6 >= time7){
                    //console.log('Duplicate Error 1 ==>' + time6,time7,time8);
                    checkSlot = false;
                }
            }
            else if(time5 >= time7 && time5 < time6){
                if(time6 <= time8){
                    //console.log('Duplicate Error 2 ==>' + time6,time7,time8);
                    checkSlot = false;
                }
            }
            else if(time5 > time7 && time5 < time8 && time5 <time6){
                checkSlot = false;
            }
            
        //     if((time6 + time6_min) <= (time8+ time8_min) && (time6 + time6_min) >= (time7 + time7_min)){

        //         console.log('Duplicate not allowed==>' +time6,time7,time8);
            
        // }
        //     else{
        //         console.log('Error==>' +time6,time7,time8);
        //     }
            // let date1 = new Date("1970-01-01T" + time5);
            // let date2 = new Date("1970-01-01T" + time2);
            // let date3 = new Date("1970-01-01T" + time3);
            // let date4 = new Date("1970-01-01T" + time4);
            
            // console.log('getTime 1==>'+ date1.getTime(),date2.getTime(),date3.getTime(),date4.getTime());

            // if(this.start  == this.dateset[g].startTime && this.end == this.dateset[g].endTime){
            //     console.log('dataorganized')
            // }else{
            //     console.log('not data found');
            // }
        }
        }
        if(checkSlot){
        this.val = false;
        console.log('this.attendees'+this.totalattend);
       let att = this.totalattend.toString();
        console.log('array'+att);
    if(this.subject != null){
    
    storeEventdata({
        arg1: this.subject, 
        arg2: this.start,
        arg3: this.end,
        arg4: this.des,
        arg5: this.finaldateformodal,
        arg6: this.email,
        arg7: this.name
    })
    .then(result =>{
       console.log('Success');
       this.notifier = "Your request is submitted successfully!";
       this.showForm = false;
       this.showSuccess = true;
       alert('Booked Successfully');
       location.reload();
       this.room1 = false;
    }).catch(error=>{
        console.log(error.body.message);
        this.errormsg = error.body.message;
        alert(this.errormsg);
        location.reload();
    })
// }
window.location.assign("https://d2v000002fkjpeas--partial.sandbox.my.salesforce-sites.com/thanks");
}
}
else{
    alert('This time slot is already taken');
}
    
// if(checkSlot == true){
//     alert('This time slot is already taken');
// }
// else{
//     console.log('success checked Slot')
// }
    // console.log('checkSlot==>' +checkSlot);
  

//  showSuccessToast() {
//     console.log('called this method');
//     const evt = new ShowToastEvent({
//         title: 'Toast Success',
//         message: 'Opearion sucessful',
//         variant: 'success',
//         mode: 'dismissable'
//     });
//     this.dispatchEvent(evt);
 }

@track showHoverEvent = false;
 @track subjec=[];
 @track finalval =[];
 @track finalTime;
 @track dataval;



//  renderCallback(e){
//     let finalvaldata =[];
//     this.finalval.length =0;
//     this.subjec.length =0;
//     //this.finalTime.length=0;
//     for(var i =0;i< this.dateset.length;i++){
//         var onlydate = this.dateset[i].date.split(' ');
//         for(var j =0;j < this.dates.length;j++){
//             let temp = false;
//             if(onlydate[0] == this.dates[j].day){
//                 this.subjec.push({
//                 day:this.dates[j].day,
//                 subj:this.dateset[i].sub,
//                 time: this.dateset[i].startTime,
//                 temp: true
//               })
//             }
//         }
//     }
//    this.dataval= e.target.dataset.id;
//   // console.log('this.dataval'+this.dataval);
//    for(var k =0;k < this.subjec.length;k++){
//    // console.log('this.subjec[k].subjvfhfdgffdg'+this.subjec[k].subj); 
 
//     if(this.subjec[k].day == this.dataval){
//         let c=0;
//       for(var m =0;m < finalvaldata.length;m++ ){
//         if(finalvaldata[m] ==this.subjec[k].day){
//             c++;
//         }
//       }
//        // finalvaldata.push(this.subjec[k].subj);
//     //this.finalTime = this.subjec[k].time;
//     console.log('Final Value Result ==============================>' + finalvaldata);
// //console.log('Final Value Time ==============================>' + this.finalTime);
// if(c == 0){
//     finalvaldata.push({
//         'subjectss':this.subjec[k].subj,
//         'time':this.subjec[k].time,
//         'temps':this.subjec[k].temp
//     }) ;

// }
//     }
//     console.log('sadsabsack.jsakcbjk.sab/'+finalvaldata);
    
//    }  
// this.finalval = finalvaldata;
// console.log('this.finalval'+this.finalval);
// }





/* Showing Event for particular Date */


showEvent(e){
    this.showHoverEvent = true;
    // this.checksub(e)
   // this.checksubject(e);
//this.connectedCallback(e);
}

hideEvent(){
    this.showHoverEvent = false;
}
@track eventCheck = false;
showAllEvent(){
    this.generateCalendarDates();
    this.eventCheck = true;
   // this.displayCurrentMonth();
}

hideAllEvent(){
    this.eventCheck = false;
}

}
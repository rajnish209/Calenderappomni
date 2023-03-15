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
                        'id':a.Id,
                        'date': a.Date__c,
                        'sub' :a.Subject__c,
                        'startTime' : a.Start_Time__c,
                        'endTime':a.End_Time__c,
                        'status':a.Status__c,
                        'Name':a.Name__c,
                    })
                })
                
                console.log('DateSet==>'+this.dateset)
            })
            
            .catch(error => {
                this.error = error;
            });
    }
    


   
    
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
            for(let k =0;k < this.dateset.length;k++){
                let sss=[];
                let finaldate = this.dates[l].day+" "+ this.displayMonth+" "+this.displayYear;
                var onlydate = this.dateset[k].date;                  
                sss.push({
                    'recId':this.dateset[k].id,
                    'recSubject':this.dateset[k].sub,
                    'recStatus':this.dateset[k].status,
                    'recStartTime':this.dateset[k].startTime,
                    'recEndTime':this.dateset[k].endTime,
                    'recName':this.dateset[k].Name,
                    });
                for(var i=0;i < sss.length;i++){
                    if(finaldate == onlydate){
                        this.dates[l].valuess.push(sss[i]);
                        //console.log('Each Record==>',this.dates[l].values.sss[i]);
                    }
                }
            }
        }

        for(let j = 0; j < this.dates.length;j++){
            if(this.dates[j].flag == false){
                this.variable = false;
            }
            else if(this.dates[j].flag == true){
                this.variable = true;
            }
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
    //this.room2 = true;
    window.location.assign('https://d2v000002fkjpeas--partial.sandbox.my.salesforce-sites.com/meetingroom');
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
                let checkStatus = this.dateset[g].status;

                if(checkStatus == 'Reject'){
                    checkSlot = true;
                }
                else{

                    if(time5 < time7 && time5 < time6 && time6 >= time7){
                        checkSlot = false;
                        
                    }
                    else if(time5 > time7 && time5 < time6 && time6 < time8){
                        checkSlot = false;
                    }
                    else if(time5 > time7 && time5 < time8 && time5 <time6){
                        checkSlot = false;
                    }
                }
            }

        }

        if(checkSlot == true){
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
                window.location.assign("https://d2v000002fkjpeas--partial.sandbox.my.salesforce-sites.com/thanks");
            }   
        }
        else{
                alert('This time slot is already taken');
            }
    }

@track showHoverEvent = false;
 @track subjec=[];
 @track finalval =[];
 @track finalTime;
 @track dataval;

/* Showing Event for particular Date */


showEvent(e){
    this.showHoverEvent = true;

}

hideEvent(){
    this.showHoverEvent = false;
}

@track eventCheck = false;


showAllEvent(){
    this.generateCalendarDates();
    this.eventCheck = true;
    console.log('EventCheck==>',this.eventCheck)
    this.handleMicroSoft();
    
}

hideAllEvent(){
    this.eventCheck = false;
    console.log('EventCheck==>',this.eventCheck)
}


@track showFullEventDetails = false;
dataAgain;
EventShowDetails(e){
this.dataAgain = e.target.dataset.id;
console.log('Data Again==>',this.dataAgain);
//this.showFullEventDetails = true;
}

handleMicroSoft(){
const script = document.createElement('script');
script.src = 'https://statics.teams.cdn.office.net/sdk/v1.8.0/js/MicrosoftTeams.min.js';
document.head.appendChild(script);

script.onload = () => {
    // Initialize the Microsoft Teams SDK
    microsoftTeams.initialize();

    // Authenticate the user and get an access token
    microsoftTeams.authentication.authenticate({
        url: window.location.origin + '/oauthcallback.html',
        width: 600,
        height: 535,
        successCallback: (result) => {
            const accessToken = result.accessToken;

            // Show the Teams scheduling dialog to book a meeting slot
            microsoftTeams.scheduling.showScheduleNewEventDialog({
                token: accessToken,
                successCallback: (result) => {
                    console.log('Meeting slot booked successfully:', result);
                },
                errorCallback: (error) => {
                    console.error('Error booking meeting slot:', error);
                }
            });
        },
        failureCallback: (error) => {
            console.error('Error authenticating user:', error);
        }
    });
};
}
   
}

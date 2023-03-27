import { LightningElement,track,wire } from 'lwc';
import storeEventdata from '@salesforce/apex/getFieldsFromEvent.storeEventdata';
import getAttendees from '@salesforce/apex/getFieldsFromEvent.getAttendees';
import OmnicloudLogo2 from '@salesforce/resourceUrl/OmnicloudLogo2'
import ZoomIcon from '@salesforce/resourceUrl/ZoomIcon'
import ReserveEvent from '@salesforce/resourceUrl/ReserveEvent'
import Feedback from '@salesforce/resourceUrl/Feedback'

export default class MeetingRoom extends LightningElement {

    logo = OmnicloudLogo2;
    Zoom = ZoomIcon;
    Feedback = Feedback;
    ReserveEvent = ReserveEvent;
   

    @track first = false;
    @track second = false;
    @track third = false;
    @track closeButton = true;
    @track disableButton = true;

    handleFirst(){
        this.first = true;
    }

    handleSecond(){
        this.second = true;
    }

    closeModalnext(){
        this.first = false;
    }

    closeModalsecond(){
        this.second = false;
    }
@track value=[];
    @wire(getAttendees)
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

    @track subject;
@track start;
@track end;
@track totalattend =[];
@track attendees="";
@track des;
@track datess;
@track Name;
@track email;
    handlesubject(e){
    this.subject = e.target.value;
    if(this.subject!= null && this.start != null && this.end != null && this.email != null && this.Name != null){
        this.disableButton = false;
    }

    }
    handleChangestart(e){
    this.start = e.target.value;
    if(this.subject!= null && this.start != null && this.end != null && this.email != null && this.Name != null){
        this.disableButton = false;
    }
    }
    handleChangeEnd(e){
    this.end = e.target.value;
    if(this.subject!= null && this.start != null && this.end != null && this.email != null && this.Name != null){
        this.disableButton = false;
    }
}
    // handleChangeattendees(e){
    // console.log('this.attendees'+this.totalattend.length);  
    // this.attendees=  e.target.value;
    // if(this.totalattend.length > 0){
    //     let c=0;
    // for(var j = 0;j < this.totalattend.length;j++){

    //     if(this.totalattend[j] == this.attendees){
    //       c++;
    //     }
    //   }
    //   if(c == 0){
    //     this.totalattend.push(this.attendees); 
    //   }
    // }else{
    //     this.totalattend.push(this.attendees); 
    // }
    // // console.log(this.attendees);
    // }
    handledescription(e){
        this.des = e.target.value;
    }
    handledate(e){
        this.datess = e.target.value;
        
    }
    handleName(e){
        this.Name = e.target.value;
        if(this.subject!= null && this.start != null && this.end != null && this.email != null && this.Name != null){
            this.disableButton = false;
        }
    }
    handleEmail(e){
        this.email = e.target.value;
        if(this.subject!= null && this.start != null && this.end != null && this.email != null && this.Name != null){
            this.disableButton = false;
        }
    }
    handlesubmit(){
        this.disableButton = true;
        this.val = false;
        console.log('this.attendees'+this.totalattend);
       let att = this.totalattend.toString();
        console.log('array'+att);

        var formateDate = new Date(this.datess).toLocaleString('en-GB',{
           
            day: 'numeric',
            month: 'long',
             year: 'numeric'   
          });
    if(this.subject != null){
    
        storeEventdata({
            arg1: this.subject.trim(), 
            arg2: this.start,
            arg3: this.end,
            arg4: this.des.trim(),
            arg5: formateDate,
            arg6: this.email.trim(),
            arg7: this.Name.trim(),
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
   }
   window.location.assign("https://d2v000002fkjpeas--partial.sandbox.my.salesforce-sites.com/thanks");
   
 }
 handleredirectcalender(){
    window.location.assign("https://d2v000002fkjpeas--partial.sandbox.my.salesforce-sites.com/CalenderHomePage");
   
 }

}
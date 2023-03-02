import { LightningElement,track,wire,api } from 'lwc';
import getSubject from '@salesforce/apex/getFieldsFromEvent.getSubject';
import runMyFlow from '@salesforce/apex/getFieldsFromEvent.runMyFlow';
import rejectFlow from '@salesforce/apex/getFieldsFromEvent.rejectFlow';


export default class LinkToApproveEvent extends LightningElement {
    @api
    recordId;

    @track FinalDate;
    @track StartTime;
    @track EndTime;
    @track totaldata=[];
    RecordIdReject;
    ConferenceRecordId;


@track fall;
// handleLoad(Id) {
//     updateRecord({
//         idagain:Id,
//         status : 'Approved'
         
//         }).then(result =>{
//         console.log("success");
//          alert('Password Updated Successfully!...');
        
//                 }).catch(error=>{
//          console.log(error.body.message);
//          alert(error.body.message) })
// }
@track finaldata;
    @wire(getSubject)
    wiredAccount({error,data}){
             if(data){
               this.finaldata = data;
                data.forEach(a=>{
               // console.log('a.subject'+a.Subject__c);
                if(a.Date__c == this.FinalDate){
                  this.totaldata.push(
                    {
                        'sub':a.Subject__c,
                        'starttime':a.Start_Time__c,
                        'endTime':a.End_Time__c,
                        'date':a.Date__c,
                        'status':a.Status__c,
                    }
                  )
                }
                })
            
             }else{
                console.log('error1234'+error);
             }
            // console.log('thistotaldata'+this.totaldata);
        }
@track temp;

handleApprove(){


this.temp = true;
for(var i =0;i < this.finaldata.length;i++){
    
    if(this.finaldata[i].Date__c == this.FinalDate && this.finaldata[i].Start_Time__c == this.StartTime && this.finaldata[i].End_Time__c == this.EndTime){
      //  this.handleLoad(this.finaldata[i].Id);
      this.ConferenceRecordId = this.finaldata[i].Id;

    }
}
console.log('Record Id',this.ConferenceRecordId);

runMyFlow({ recordIds: [this.ConferenceRecordId] })
.then(result => {
    // Handle successful flow execution  
     console.log('Flow executed successfully');
     alert('Event is Approved');
     location.reload();
    })
     .catch(error => {
// Handle flow execution error             
  console.error(error);
});

}




handleReject(){
this.temp = false;

for(var i =0;i < this.finaldata.length;i++){
    
    if(this.finaldata[i].Date__c == this.FinalDate && this.finaldata[i].Start_Time__c == this.StartTime && this.finaldata[i].End_Time__c == this.EndTime){
      //  this.handleLoad(this.finaldata[i].Id);
      this.RecordIdReject = this.finaldata[i].Id;

    }
}
console.log('Record Id Rejected',this.RecordIdReject);

rejectFlow({ recordIds: [this.RecordIdReject] })
.then(result => {
    // Handle successful flow execution  
     console.log('Flow Rejected successfully');
     alert('Event is Rejected');
     location.reload();
    })
     .catch(error => {
// Handle flow execution error             
  console.error(error);
});


}

    connectedCallback(){


    const currentUrl = window.location.href;
    console.log('page url',currentUrl);
    var data = currentUrl.split('?');
    console.log('data   ====> ',data[1]);
    let  FullData = data[1].split('-');
    // console.log('Full data ==>',FullData);
    let CompleteDate = FullData[0].split('%20');
    let start_time = FullData[1];
    let end_time = FullData[2];
    this.FinalDate = CompleteDate[0]+' '+CompleteDate[1]+' '+CompleteDate[2];
    //console.log('FinalDate ===>>>',this.FinalDate ,start_time,end_time);
    this.StartTime = start_time;
    this.EndTime = end_time;
  
  }



}
public  class getFieldsFromEvent {
    public getFieldsFromEvent() {
        
    }
    
    
    @AuraEnabled
    public static void storeEventdata(String arg1, String arg2, String arg3 ,String arg4,String arg5,String arg6,String arg7)
    {
        
        try {
            Conference_Room__c details = new Conference_Room__c(
                Subject__c =  arg1,
                Start_Time__c = arg2,
                End_Time__c = arg3,
                Description__c = arg4,
                Date__c = arg5,
                Attendee_Email__c = arg6,
                Name__c = arg7
            );
            
            insert details;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Conference_People__c> getAttendees(){
        return [SELECT Id,Name,Email__c FROM Conference_People__c];
        
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Conference_Room__c> getSubject(){
        return [SELECT Id,Subject__c,Date__c,Start_Time__c,End_Time__c,Status__c FROM Conference_Room__c];
    }
    
    @AuraEnabled
    public static void updateRecord(String status ,Id idagain){
        try {
            Conference_Room__c Updated = new  Conference_Room__c(
                Id = idagain,
                Status__c = status
            );
            update Updated;
        } 
        catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void runMyFlow(List<Id> recordIds) {
        Map<String,Object> params = new Map<String,Object>();
            params.put('recordId',recordIds[0]);
            Flow.Interview.updateApprove fetchRec = new Flow.Interview.updateApprove(params);

            fetchRec.start();
    }

    @AuraEnabled
    public static void rejectFlow(List<Id> recordIds) {
        Map<String,Object> params = new Map<String,Object>();
            params.put('recordId',recordIds[0]);
            Flow.Interview.updateReject RejectRec = new Flow.Interview.updateReject(params);

            RejectRec.start();
    }

}
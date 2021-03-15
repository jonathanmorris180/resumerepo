// This file is generated as an Apex representation of the
//     corresponding sObject and its fields.
// This read-only file is used by the Apex Language Server to
//     provide code smartness, and is deleted each time you
//     refresh your sObject definitions.
// To edit your sObjects and their fields, edit the corresponding
//     .object-meta.xml and .field-meta.xml files.

global class Property__c {
    global Id Id;
    global SObject Owner;
    global Id OwnerId;
    global Boolean IsDeleted;
    global String Name;
    global Datetime CreatedDate;
    global User CreatedBy;
    global Id CreatedById;
    global Datetime LastModifiedDate;
    global User LastModifiedBy;
    global Id LastModifiedById;
    global Datetime SystemModstamp;
    global Date LastActivityDate;
    global Datetime LastViewedDate;
    global Datetime LastReferencedDate;
    global String Address__c;
    global Decimal Assessed_Value__c;
    global Double Baths__c;
    global Double Beds__c;
    global Broker__c Broker__r;
    global Id Broker__c;
    global String City__c;
    global Date Date_Agreement__c;
    global Date Date_Closed__c;
    global Date Date_Contracted__c;
    global Date Date_Listed__c;
    global Date Date_Pre_Market__c;
    global Double Days_On_Market__c;
    global String Description__c;
    global Double Location__Latitude__s;
    global Double Location__Longitude__s;
    global Location Location__c;
    global String Picture_IMG__c;
    global String Picture__c;
    global Decimal Price__c;
    global String Record_Link__c;
    global String State__c;
    global String Status__c;
    global String Tags__c;
    global String Thumbnail_IMG__c;
    global String Thumbnail__c;
    global String Title__c;
    global String Zip__c;
    global List<ActivityHistory> ActivityHistories;
    global List<AttachedContentDocument> AttachedContentDocuments;
    global List<Attachment> Attachments;
    global List<CollaborationGroupRecord> RecordAssociatedGroups;
    global List<CombinedAttachment> CombinedAttachments;
    global List<ContactRequest> ContactRequests;
    global List<ContentDocumentLink> ContentDocumentLinks;
    global List<DuplicateRecordItem> DuplicateRecordItems;
    global List<EmailMessage> Emails;
    global List<EntitySubscription> FeedSubscriptionsForEntity;
    global List<Event> Events;
    global List<Favorite__c> Favorites__r;
    global List<Note> Notes;
    global List<NoteAndAttachment> NotesAndAttachments;
    global List<OpenActivity> OpenActivities;
    global List<ProcessInstance> ProcessInstances;
    global List<ProcessInstanceHistory> ProcessSteps;
    global List<Property__Feed> Feeds;
    global List<Property__History> Histories;
    global List<Property__Share> Shares;
    global List<RecordAction> RecordActions;
    global List<RecordActionHistory> RecordActionHistories;
    global List<Task> Tasks;
    global List<TopicAssignment> TopicAssignments;
    global List<ContentDistribution> RelatedRecord;
    global List<ContentVersion> FirstPublishLocation;
    global List<EventChangeEvent> What;
    global List<EventRelationChangeEvent> Relation;
    global List<FeedComment> Parent;
    global List<FlowRecordRelation> RelatedRecord;
    global List<OutgoingEmail> RelatedTo;
    global List<TaskChangeEvent> What;

    global Property__c () 
    {
    }
}
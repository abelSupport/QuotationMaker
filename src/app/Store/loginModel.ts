export class LoginModel {

    public Id: number = 0;

//     public User_Id: number = 0;
    public User_Name: string = '';
    public Role_ID: number = 0;
    public dept: string = '';
    public User_Pass: string = '';
    public Confirm_Pass: string = '';


    public HeaderSE: string = '';
    public HeaderEE: string = '';
    public HeaderExEng: string = '';
    public SubTital: string = '';
    public QuotationNo: string = '';
    public LetterTo: string = '';
    public OfficeOf: string = '';    
    public WorkFixedBy: string = ''; 
    public AnnexureSubHeader: string = ''; 
    public AnnexureSubHeaderAddress: string;  
    public DeliverySite: string; 
    
    public CreatedBy: string = '';
    public CreatedDate  : string = '';
    public modifiedBy: string = '';
    public modifiedDate: string = '';
    
    public viewName = 'Login';
  }
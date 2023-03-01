
export class QuotationModel {


    public QID: number = 0;

    public QuotationInvitedFor: string = '';
    public StartDate: string = '';
    public EndDate: string = '';

    public EMDAmount: number = 0;
    public QuotationAmount: number = 0;
    public ContractPeriod: string = '';
    public EligibilityCriteria: string = '';
    public QuotationFloatedByID: number = 1;
    public QuotationFloatedBy: string = ''; 

    public status: number = 0;

    public action: string = '';


    public CreatedBy: string = '';
    public CreateDate: string = '';
    public ModifiedBy: string = '';
    public modifiedDate: string = '';


// pt1workfor: string;
// pt2addressonStartDate: string;
// pt2addressonEndDate: string;
// pt3moneydeposit: number;
// pt7contractperiod: string;
// pt8fEligibilityCriteria: string;
// pt8forQuotation: string;

}
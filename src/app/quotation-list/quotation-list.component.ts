import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbcallingService } from '../dbcalling.service';
import { LoginModel } from '../Store/loginModel';

import * as pageStore from 'src/app/Store/PageStore/Page.Actions';
import { Store } from '@ngrx/store';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { QuotationModel } from '../Store/quotationModel';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import swal from 'sweetalert2';
import { BoqModel } from '../Store/boqModel';

@Component({
  selector: 'app-quotation-list',
  templateUrl: './quotation-list.component.html',
  styleUrls: ['./quotation-list.component.css']
})
export class QuotationListComponent implements OnInit {
  quotationData: any = [];
  boqData: any = [];
  dbResult: any = [];
  
  index = 0;

  loginModel: LoginModel;
  quotationModel: QuotationModel;
  boqModel: BoqModel;

  constructor(
    private dbCallingService: DbcallingService,
    private router: Router,
    private store: Store<any>
  ) {
    debugger;
    this.loginModel = new LoginModel();
    this.quotationModel = new QuotationModel();
    this.boqModel = new BoqModel();
  }

  ngOnInit(): void {
    debugger;
    try {
      debugger;
      var result1 = this.store.source['value']['QuotationStorage'].filter(
        (x) => {
          return x.viewName == 'Login';
        }
      );
      debugger;
      if (result1.length > 0) {
        this.loginModel = Object.assign({}, result1[0]);
        debugger;
        if (+this.loginModel.Id > 0) {
          this.getData();
          this.router.navigateByUrl('quotationlist');
        }
      }
    } catch (e) {}
  }

  getData() {
    debugger;
    this.dbCallingService.getData().subscribe((res) => {
      debugger;
      this.quotationData = res.data;
    });
  }

  view(data) {
    debugger;

    this.quotationModel = data;

    this.boqModel.QID = this.quotationModel.QID;
    this.boqModel.UID = this.loginModel.Id;

    if(this.boqModel.QID > 0) {
      this.dbCallingService.viewBoq(this.boqModel).subscribe((res) => {
        debugger;
        this.dbResult = res;
        this.boqData = this.dbResult.data;

        if(this.boqData.length > 0) {

              let docDefinition = {
      content: [
        {
          columns: [
            [
              {
                text: this.loginModel.HeaderSE,
                bold: true,
              },
            ],
            [
              {
                text: this.loginModel.HeaderEE,
                bold: true,
              },
            ],
            [
              {
                text: this.loginModel.HeaderExEng,
                bold: true,
              },
            ],
          ],
        },
        {
          text: 'MUNICIPAL CORPORATION OF GREATER MUMBAI',
          fontSize: 20,
          alignment: 'center',
          margintop: 10,
          // color: '#047886'
        },
        {
          text: '(Dy.Ch.Engineer(Solid Waste Management)Transport)',
          fontSize: 16,
          bold: true,
          alignment: 'center',
          // decoration: 'underline',
          color: 'skyblue',
        },
        {
          text: 'No. E.E./Tr./ES/                  /S.W.M.Dated :-',
          alignment: 'center',
          decoration: 'underline',
        },
        {
          text: 'DRAFT QUOTATION',
          alignment: 'center',
          decoration: 'underline',
        },
        {
          columns: [
            [
              {
                text: `Office of the            
                       Ex.Engineer(Transport)E.S.
                       1st  floor, Municipal  ,
                       Behind Pantnagar BEST
                       Bus Depot, Pantnagar,
                       Ghatkopar(East),
                       Mumbai : 400 075
          `,
                alignment: 'right',
              },
            ],
          ],
        },
        {
          text: 'Ref:Quotation No:' + this.loginModel.QuotationNo,
        },
        {
          text: 'Due on:' + this.quotationModel.EndDate + '\n ', 
        },
        {
          ol: [
            `Sealed Quotations are invited for the work of “` +
              this.quotationModel.QuotationInvitedFor +
              `.”as per specifications, terms and   conditions of quotation and schedule of quantities & rates.\n
              `,
            `The Quotation shall be enclosed in sealed envelope addressed to the Municipal Commissioner of Greater Mumbai and super scribed as Quotations for work mentioned above and delivered in the office of Ex. Eng.(Tr.) E/S at the above said address on or before  ` +
              this.quotationModel.EndDate +
              ` not later than 1.00 p.m.  Quotations received after this hour and date shall be returned / unopened to the Quotationer on demand. Telegraphic Quotation will not be accepted under any circumstances.  Quotations will be opened on the same day immediately after 4.00 p.m.\n
              `,
            `The Quotationer shall pay Earnest Money Deposit of Rs. ` +
              this.quotationModel.EMDAmount +
              `/--upto due date andtime.The Earnest Money Deposit shall be paid at CFC of any Municipal ward office and challan for which will be issued from the office of Ex.Eng.(Tr.) E/S during the office hours on working days except Saturdays, Sundays & Public holidays. The Earnest Money Deposit will not be accepted by cheque. The Earnest Money Deposit will be accepted by cash / Demand Draft only payable at Mumbai and drawn in favour of "Municipal Corporation of Greater Mumbai". The Xerox copy of E.M.D. receipt shall be submitted with the quotation.`,
            {
              type: 'lower-alpha',
              ol: [
                'For Supply - Contractors having Standing Deposits of Rs.1,50,000/- and above with MCGM shall not have to pay fresh E.M.D, it is mandatory on the Registered Municipal Suppliers to attach valid Standing Deposit Receipt along with envelope. However, Contractors having Standing Deposits less than Rs.1,50,000/- with M.C.G.M shall have to pay fresh EMD.',
                'For works - Contractors have to pay fresh E.M.D. although he has paid Standing Deposit of any amount.\n ',
              ],
            },
            'The rates quoted shall be firm and no variation will be allowed subsequently on any account.\n ',
            { text: 'Tax', bold: true },
            {
              type: 'lower-alpha',
              ol: [
                'The quotationer shall clearly state the rates of all the taxes such as CGST,SGST,IGST and other GST etc. applicable as per the Government Act in force at the time of submission of the Quotation and work out the actual amounts thereof. If the taxes are not mentioned, it will be presumed that, these taxes are not applicable, being already paid by the quotationer and will be borne by them.  No subsequent claim from the quotationer for payment of these taxes shall be entertained.  The offer which does not show the rates of taxes chargeable but vaguely states “Taxes as applicable or CGST, SGST and other GST extra” will be left out of consideration.The taxes shall be applicable as per HSN code / SAC code for the supply / work under consideration. \n',
                'All the rates shall be inclusive of all duties such as Customs, Excise etc. otherwise their actual amount should be shown extra. If they are not mentioned, it will be 	presumed that the rates are inclusive of such duties and no subsequent claim for payment of these duties will be entertained.\n ',
              ],
            },
            `The successful quotationer shall include free delivery at site i.e. Pantnagar Garage	or as directed by MCGM.\n `,
            `Contract period: -` +
              this.quotationModel.ContractPeriod +
              ' months' +
              `.
       `,
            `Eligibility Criteria:-
       For work-
       ` +
              this.quotationModel.EligibilityCriteria +
              `.
       `,
            `Validity of the Quotation:-
       The Quotation shall remain firm and valid at-least for 90 days from the date of opening / submission.
       `,
            {
              text: 'The quotationer shall be registered vendor of MCGM.\n ',
              bold: true,
            },
            `Terms of payment:-
As per the Municipal procedure the payment for the supply / work done will be made within 30 days from the receipt of the bill subject to satisfactory completion of the supply / work. \n
`,
            `The Municipal Commissioner does not bind himself to accept the lowest or any Quotation.  In case of any dispute, Municipal Commissioner’s decision shall be final and binding on the Quotationers.\n `,
            `Warranty:
For supply / work-
(a) For Supply of Assembly units/ Articles / Materials the Manufacturer’s warranty, as stated by manufacturer shall be applicable.
(b)   The successful quotationer shall submit Annexure as per attached prescribed format on Rs. 100 stamp paper after completion of work for warranty.\n
`,
            `The successful Quotationer shall enter into a written contract with M.C.G.M. as per 	provision of section 70 (1) (b) of M.M.C. Act 1888 in the prescribed form by paying 	the contract deposit (5% of the contract amount), legal and stationery charges of Rs. 	------/-+ GST, as applicable.\n `,
            `The successful quotationer shall have to pay 5% of contract amount as "contract 	deposit" for the supply/work exceeding Rs.50,000/-. The "contract Deposit" will be 	released after completion of defect liability period of 12 months or as stated.\n `,
            `The Quotationer shall not withdraw his offer within the validity period. If he does so, 	the Earnest Money Deposit paid, will be absolutely forfeited to the Corporation.\n `,
            `It is essential on part of quotationer to collect complete details of spares to be 	supplied and /or works to be carried out before submitting his offer as no claim \n `,
            'For supply:-The quotationer/bidder shall specify the make of spares material.\n ',
            'If the quotationer fails to submit relevant information with quotation then, the 	shortfalls shall be communicated to the quotationer through e-mail only and 	compliance required to be made within a time period of three working days	otherwise they shall be treated as non-responsive.\n ',
            `	A) Penalty for work:-
         a)	For failure to comply with the work order for work placed within stipulated period with the desired level of efficiency as per specifications, penalty for Rs. 500/- per day will be recovered from contractors without any reference. The amount for penalty will be, however subject to maximum of 10% of value of the delayed work may be fixed by Ch.E.(SWM)/DMC(SWM)/Jt.M.C.(SWM).
         b)	Penalty for Supply: - \n 
         a)	For Delay - For failure to comply with the order placed for supply of the articles within the stipulated period mentioned in quotation document from receipt of SAP PO, a penalty equivalent to 1/2 % per week or part thereof on the value of the delayed supply of articles will be recovered from the contractors without making any reference to the contractors. The amount of the penalty will, however, be subject to the maximum of 10% of the contract sum or such smaller amount as may be fixed by the Chief Engineer (SWM)/DMC (SWM) / Jt.M.C.(SWM).
         b)	For inferior quality - In case, the contractor at any time during the continuance of these present supply of the material mentioned in schedule is rejected because of inferior quality, the MCGM reserves right to levy penalty for such inferior supply from contractor, not exceeding 20% of the cost of the supplied material. The period required for replacement of inferior quality of material with approved quality material shall be made within three working days.
         `,
            'The Quotationer shall give the undertaking in the sub-joined form.\n ',
            'E.M.D. of all the bidders except successful quotationer will be released after award of the work to the successful quotationer. E.M.D. will be released by E.C.S.\n ',
            'The Quotationer shall invariably submit this Quotation notice form together with the specification, schedule of quantities and rates duly filled in and signed. Any irregularity in this respect may render the quotation liable for rejection. \n ',
            'The payment will be made in contractor’s or supplier’s account in the bank through ECS system. \n ',
            'All the Quotationers must disclose the names of their partners, if any in the particular contract. Any quotationer failing to do so will render himself liable to have his quotation deposit forfeited and the contract entered into cancellation at any time during its currency.\n ',
            `A)	None of the Quotationer whose firms are having common partner / proprietor or who are connected with the another either financially or as principal & agent or master and servant or closely related to each other such as Husband and wife, father / Mother and minor son /daughter and minor 	Daughter /sister shall quote separately under different names of establishments.
        B)	If it is found that any firm having common partner/proprietor who are connected with one another either financially or as principal and agent or master and servant closely inter-related such as husband and wife, father/mother and minor son/daughter and minor daughter/sister have quoted separately under different names or establishments for the same contract, the Quotation shall stand rejected and Earnest Money Deposit shall be forfeited.  Any contract entered into under such condition will also be liable to be cancelled at any time during it’s currency. In addition such firms / establishments shall be liable at the direction of the municipal Commissioner for further final action including blacklisting.
        C)	If it is found that closely related persons as in direction no. 26 have submitted separate Quotations under different names of firms / establishments but with common addresses for such firms / establishments and / or if such establishments / firms though they have different addresses are managed or Governed by the same person / persons jointly or separately, such quotationer shall be liable for action on the direction No.2 B including similar action against the firm/ establishments concerned.
        D)	If the award of contract is found that the accepted quotationer violated any of the direction 28A, 28B or 28C, the contract shall be liable for cancellation at any time during its currency in addition to penal action against the contractors as well as related firms/ establishments.
      `,
            `Under the Provision of the section 194 (C) of the Indian Income Tax act the 	corporation is required to deduct tax at source & under present legislation Tax @ 2% 	of the gross amount of each bill submitted shall be deducted at source.The	certificate for the same will be issued.\n `,
            `Certified copies of valid ‘PAN’ documents and photographs of the individuals, 	owners, Karta of Hindu undivided Family, firms, private limited companies, registered co-operative societies, partners of partnership firms and at least two Directors, if number of Directors are more than two in case of Private Limited Companies, as the case may be. However, in case of Public Limited companies, Semi Government Undertakings, Government Undertakings, no ‘PAN’ documents shall be insisted.\n `,
            `If the quotationer breaches any or all of the conditions mentioned in quotation 	document, he/she/firm is liable for any or all the penal action such as cancellation of 	purchase order (P.O.), forfeiture of EMD/part of EMD, Cancellation of vendor 	registration, debarring of firm from participation in future quotation process as deemed fit by MCGM authorities. \n `,
            `There shall be regular review regarding the performance of the contractor by MCGM. In case at any stage, it is observed that the performance of the contractor is unsatisfactory or discrepancies are found in the works carried out by contractor/ quotationer, MCGM reserves the right to take penal action such as cancellation of purchase order (P.O.)/work order, forfeiture of EMD/part of EMD, Cancellation of vendor registration, debarring of firm from participation in future quotation process /blacklisting of vendor as deemed fit by MCGM authorities.\n
            `,
            `Quotationer shall submit following undertakings in original inside the envelope to be 	submitted, as per the prescribed formats.
      1)	ANNEXURE – A :UNDERTAKING
      2)	ANNEXURE – B :DETAILS OF FIRM
      `,
            `The successful quotationer shall submit following undertakings in original as per the 	prescribed formats,
      1)	ANNEXURE – C: Undertaking cum indemnity bond (on Rs. 200/- stamp paper and notarized).
      2)	Irrevocable Undertaking on Rs. 500/- stamp paper duly notarized.
      `,
            `The Municipal Commissioner reserves the right to terminate the contract by giving 7days notice without assigning any reasons and in such eventuality no claim for any loss or compensation will be considered.\n `,
            `The quotation may be considered incomplete, irregular and invalid unless it is signed by the proprietor, named managing partner or all partners or by party of parties stating specifically their position and status at schedule of quantities and rates.\n `,
            `The cases wherein if the shortfalls are not complied by a contractor, shall be informed to Registration and Monitoring Cell. Such non-submission of documents shall be considered as ‘Intentional Avoidance’ and if three or more cases in 12 months are reported, shall be viewed seriously and disciplinary action against the defaulters such as banning/de-registration, etc. shall be taken by the registration cell with due approval of the concerned AMC.\n `,
            `	No rejections and forfeiture shall be done in case of curable defects. For non-curable defects the 10% of EMD shall be forfeited and quotation shall be liable for rejection. 
              Note:
                i)Curable Defect shall mean shortfalls in submission such as:
              a. Non-Submission of following documents,
              i. Valid Registration Certificate.
              ii. Valid Bank Solvency
              iii. Goods and Service Tax Registration Certificate (GST)
              iv. Certified Copies of PAN documents and photographs of individuals, owners, etc.
              v. Partnership Deed and any other documents
              vi. Undertakings as mentioned in the tender / quotation document.
              b. No proper submission of experience certificates and other documents, etc.

                ii)Non-curable Defect shall mean,
              a. In-adequate submission of EMD amount,
              b. In-adequacy of technical and financial capacity with respect to Eligibility criteria as stipulated in the quotation.\n
              `,
            `	JURISDICTION OF COURT
            In case of any claim, dispute or difference arising out of any terms and conditions of the contract, the Cause of Action thereof shall be deemed to have arisen in Mumbai & all legal proceedings in respect of any such claim, dispute or difference shall be instituted in a competent court in the City of Mumbai only. \n \n\n \n\n \n\n \n
            \n \n\n \n `,
          ],
        },
        {
          text: `\n\n Ex.Eng.(Tr.) E/S`,
          alignment: 'right',
          pageBreak: 'after',
        },



         // Adding BOQTable code here

         {
          text: 'BRIHANMUMBAI MUNICIPAL CORPORATION',
          fontSize: 20,
          alignment: 'center',
          margintop: 10,
          // color: '#047886'
        },
        {
          text: '(S W M DEPT.-DyChE(SWM) Tr/EE(Tr)ES)',
          fontSize: 16,
          bold: true,
          alignment: 'center',
          // decoration: 'underline',
          //  color: 'skyblue'
        },
        {
          text: `\nSCHEDULE OF QUANTITY AND RATES`,
          fontSize: 12,
        
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          //  color: 'skyblue'
        },

        {
          text: `\n\nSub :- Design, development and maintenance of online application system for standardization of
                              quotations and maintaining data for quotations floated under DyChE(SWM)Tr section`,
          fontSize: 12,
        
          bold: false,
          alignment: 'center',
          // pageBreak: 'after',
          // decoration: 'underline',
          //  color: 'skyblue'
        },

        {
          text: `\n\n Bill Of Quantity`,
          fontSize: 12,
        
          bold: false,
          alignment: 'left',
          // pageBreak: 'after',
          // decoration: 'underline',
          //  color: 'skyblue'
        },
        
        {  
          table: {  
              
              headerRows: 1,  
              widths: ['*', '*', '*','*', '*'],  
              body: [  
                  ['Description', 'QTY', 'Unit', 'BAsic rate(RS)','Basic Amount(Rs)'],  
                  ...this.boqData.map(p => ([p.Description, p.Quantity, p.Unit, p.Rate ,(p.Rate * p.Quantity).toFixed(2)])),  

                  [ { text: '\n', colSpan:5, alignment: 'left', borders:'none' } ],

                  [ { text: 'Sub Total', colSpan:4, alignment: 'right' },{}, {}, {}, { text: this.boqData.reduce((sum, p) => sum + (p.Rate * p.Quantity), 0).toFixed(2), colSpan:1 } ],

                  [ { text: 'GST@%:-', colSpan:4, alignment: 'right' },{}, {}, {}, { text: '', colSpan:1, alignment: 'center' }],
                  [ { text: 'GST Amount:-', colSpan:4, alignment: 'right' },{}, {}, {}, { text: '', colSpan:1, alignment: 'center' }],
                  [ { text: 'Total:-', colSpan:4, alignment: 'right' },{}, {}, {}, { text: '', colSpan:1, alignment: 'center' }],
                  [ { text: '\n\nGrandTotal(In Words)Rs:-', colSpan:5, alignment: 'left', alignVertical:'center' } ],

                  [ { text: '\n\n\n\n', colSpan:5, alignment: 'left' } ],

                  [ { text: "\n\n\nQuotationer's address, office stamp and telephone No. if any." , colSpan:2, alignment: 'left' }, {} ,
                    { text: "\n\n\nQuotationer's signature and office stamp trading under the name & style of", colSpan:3, alignment: 'center' }, {}, {} 
                  ],
                 
                  ]   
          }  ,
          pageBreak: 'after',
        } ,


          // end of code


        {
          text: 'MUNICIPAL CORPORATION OF GREATER MUMBAI',
          fontSize: 20,
          alignment: 'center',
          margintop: 10,
          // color: '#047886'
        },
        {
          text: 'S W M - Transport (Eastern Suburb) Branch',
          fontSize: 16,
          bold: true,
          alignment: 'center',
          // decoration: 'underline',
          //  color: 'skyblue'
        },
        {
          text: `(Office of the Ex.Engineer (Transport) E.S., 1st floor, Municipal building, Behind Pantnagar BEST Bus Depot, Pantnagar, Ghatkopar (East), Mumbai: 400 075)`,
          fontSize: 12,
          bold: true,
          alignment: 'center',
          // decoration: 'underline',
          //  color: 'skyblue'
        },


        {
          columns: [
            [
              {
                text: `To,
                The Municipal Commissioner
                Brihanmumbai Mahanagarpalika,
                      Mahapalika Marg,
                       Mumbai – 400 001.
                
          `,
                alignment: 'left',
              },
            ],
          ],
        },
        {
          text: `   Sir, 
          I/We have read all the terms and condition stipulated in the above Quotation Notice and accepts the same.
        `,
        },

        {
          text: `\n\n Yours faithfully,`,
          alignment: 'right',
        },
        {
          text: `\n\n Quotationer’s signature and seal,`,
          alignment: 'right',
        },
        {
          text: `Quotationer’s Full Address
          and Telephone No., Seal
          if any.
          `,
          alignment: 'left',
          pageBreak: 'after',
        },

        {
          text: 'MUNICIPAL CORPORATION OF GREATER MUMBAI',
          fontSize: 20,
          alignment: 'center',
          margintop: 10,
          // color: '#047886'
        },
        {
          text: 'S W M - Transport (Eastern Suburb) Branch',
          fontSize: 16,
          bold: true,
          alignment: 'center',
          // decoration: 'underline',
          //  color: 'skyblue'
        },
        {
          text: `(Office of the Ex.Engineer (Transport) E.S., 1st floor, Municipal building, Behind Pantnagar BEST Bus Depot, Pantnagar, Ghatkopar (East), Mumbai: 400 075)`,
          fontSize: 12,
          bold: true,
          alignment: 'center',
          // decoration: 'underline',
          //  color: 'skyblue'
        },
        {
          text: 'ANNEXURE – B',
          alignment: 'center',
          decoration: 'underline',
        },
        {
          text: 'DETAILS OF FIRM',
          alignment: 'center',
          // decoration: 'underline',
        },
        {
          text: `   a)	Quotationer No.			:  

          b)	Quotationer’s Name		:
          
          c)	Quotationer’s address,		:
          Telephone/Mobile No.
          & e-mail
          
          
          
          d)	Whether registered under		:  Yes/No
          B.S.T. Act, 1959 (Registration Regn. No.
          must be effective on date
          of quotation)
          
          
          e)	Certificate in support		: Enclosed/Not enclosed
               of (d) above if registered.
          
          (If this format is not filled in, it will be presumed that the
          quotationer is not a registered dealer)
          
          f)	Information regarding status of tenderers/quotationers :
          
          i)	If it is proprietary concern?
          \t If so, name of the owner.
          
          ii)	If it is partnership concern, please furnish name of
          each partner and copy of Registration Certificate.
          
          iii)	In case of Company, please furnish documentary proof
          to show that the Company is registered.
           `,
        },
        {
          text: `\n\n  Signature of authorized person
          of Concern Company/Quotationer  
          ,`,
          alignment: 'right',
          pageBreak: 'after',
        },

        {
          text: 'ANNEXURE – C',
          alignment: 'center',
          decoration: 'underline',
        },
        {
          text: 'UNDERTAKING CUM INDEMNITY BOND',
          alignment: 'center',
          // decoration: 'underline',
        },
        {
          text: `We, (1) Mr. ___________________________, (2) Mr. ___________________________
          and (3) Mr. ____________________________ aged (1) ______yrs, (2) _____ yrs, and (3) ______ yrs. respectively, Proprietor/ Partners/ Directors/ Power of Attorney holder of the Firm ________________________________ having its office at ________________ _________________________________________________________ hereby gives an UNDERTAKING CUM INDEMNITY BOND as under :
          
          AND WHEREAS we are registered contractor/s with the Municipal Corporation of Greater Mumbai and / or (Name of other authority) having Registration No. _________ valid up to ________________.
          
          AND WHEREAS the Municipal Corporation of Greater Mumbai had published the tender notice for the work of _____________________________________________________
          ________________________________________________________________ Ward.
          
          AND WHEREAS I/We want to participate in the said Tender procedure, I/We hereby give an Undedrtaking-cum-Indemnity Bond as hereinafter appearing:- 
          I/We hereby agree and undertake that my/our Firm is not under any penal action such as Demotion, Suspension, Blacklisting, De-registration etc. by any Government, Semi Government and Government Under takings etc. 
          I/We hereby further undertake to communicate if my/our Firm comes under any penal action such as Demotion, Suspension, Blacklisting, De-registration etc. by any Government, Semi Government and Government Under takings etc. 
           I/We hereby further agree and undertake that, at any stage of tendering procedure, if the said information is found incorrect, it should be lawful for the MCGM to forthwith debar me/ us from the tendering procedure and initiate appropriate penal action. 
          The undertaking-cum-indemnity Bond is binding upon us/ our heirs, executors, administrators and assigns and/ or successor and assigns. 
          
          Place  :
          Dated :
                        Proprietor/ Partners/Directors/POA
                          (Seal of Firm/Co.)
          Identified by me, 
          
                        BEFORE ME,
          
          (Note: This affidavit should be given in original, on Rs.200/- stamp paper duly notarized by Notary with red seal and registration number)
          
            `,
          pageBreak: 'after',
        },


       


        {
          text: 'IRREVOCABLE UNDERTAKING',
          alignment: 'center',
          decoration: 'underline',
        },
        {
          text: '(On Rs.500/- Stamp Paper duly notarized by Notary with red seal and registration number) ',
          alignment: 'center',
          decoration: 'underline',
        },
        {
          text: `I Shri/Smt…………………………………………… aged ……….. years Indian Inhabitant.  Proprietor/Partner/Director of M/s…………….…………………. resident at ………………………………………………. do hereby give Irrevocable Undertaking as under:
          1.	I say & undertake that as specified in section 171 of CGST Act, 2017, any reduction in rate of tax on supply of goods or services or the benefit of input tax credit shall be mandatorily passed on to MCGM by way of commensurate reduction in prices.
          2.	I further say and undertake that I understand that in case the same is not passed on and is discovered at any later stage, MCGM shall be at liberty to initiate legal action against me for its recovery including, but not limited to, an appeal to the Screening Committee of GST Counsel.
          3.	I say that above said irrevocable undertaking is binding upon me/my partners/company/other Directors of the company and also upon my/our legal heirs, assignee, Executor, administrator etc.
          4.	If I fail to compliance with the provisions of the GST Act, I shall be liable for penalty/punishment or both as per the provisions of GST Act.
            Whatever has been stated here in above is true & correct to my/our own knowledge & belief.
          Solemnly affirmed at 							DEPONANT
          
          
          This day of 								BEFORE ME
          
          Interpreted Explained and Identified by me
          `,
        },
      ],
      styles: {
        header: {
          fontSize: 12,
          bold: true,
          alignment: 'center',

          lineHeight: 1.25,
        },
        subheader: {
          fontSize: 8,
        },
        quote: {
          italics: true,
        },
        small: {
          fontSize: 6,
        },
        block: {
          margins: [0, 5],
        },
        tableHeader: {
          bold: true,
          color: 'black',
          alignment: 'center',

          fontSize: 8,
        },
        footnote: {
          fontSize: 6,
          margin: [0, 1, 0, 0],
        },
      },
    };

    pdfMake.createPdf(docDefinition).open();

        }

      });
    }

  }

  verify(data) {
    debugger;
    this.quotationModel = data;
    this.quotationModel.action = 'verify';

    swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to Verify this Quotation',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
      })
      .then((result) => {
        if (result.isConfirmed) {
          
          this.dbCallingService.verify(this.quotationModel).subscribe((res) => {
            debugger;
            this.getData();
          });

        }
    });


   
  }

  approve(data) {
    debugger;
    this.quotationModel = data;
    this.quotationModel.action = 'approve';


    swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to Approve this Quotation',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    })
    .then((result) => {
      if (result.isConfirmed) {
        
        this.dbCallingService.verify(this.quotationModel).subscribe((res) => {
          debugger;
          this.getData();
        });

      }
    });

    
  }

  generateQuotation() {
    debugger;
    this.router.navigateByUrl('home');
  }

}

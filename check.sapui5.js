// in check.sapui5.js you will see the checkboxes i am refering to in this code
// in 11/2019-15/2019(these are weeks), if you press one checkbox, it will uncheck or check all delivery histories, that should be considered for deliveries
onCheckAll: function (oEvent) {
  var self = this;
  var vChk = this.byId(oEvent.getSource().getId());
  var oSmartFilterBar = self.byId('listReportFilter').getFilterData();
  if (oSmartFilterBar.DairyHomePlant === undefined) {
    var vHomePlant = '';
  } else {
    vHomePlant = oSmartFilterBar.DairyHomePlant.items[0].key;
  }
  if (oSmartFilterBar.DairyBusinessDeliveryID === undefined) {
    var vMatlDelivery = '';
  } else {
    vMatlDelivery = oSmartFilterBar.DairyBusinessDeliveryID.items[0].key;
  }
  if (oSmartFilterBar.DairyRawMaterial === undefined) {
    var vRawMatl = '';
  } else {
    vRawMatl = oSmartFilterBar.DairyRawMaterial.items[0].key;
  }
  self._checkFunction(oEvent, vChk, vHomePlant, vMatlDelivery, vRawMatl);

},
// If you do a modification on a checkbox in the list(not the ones from the header), a Save button will appear in the footer
onCheck:function(oEvent){
    this.byId('page').getFooter().getAggregation('content')[1].setVisible(true);
},
_addSaveBtnToFooter: function () {
  var oFooter = this.byId("page").getFooter();
  oFooter.addContent(new sap.m.Button({
    text: this.getView().getModel("@i18n").getResourceBundle().getText("SaveButton"),
    type: "Emphasized",
    visible: false,
    press: function (oEvent) {
      this._saveChanges(oEvent, this);
    }.bind(this)
  }));
},
// Add the button dinamically from JS file
_addCancelBtnToFooter: function () {
  var oFooter = this.byId("page").getFooter();
  oFooter.addContent(new sap.m.Button({
    text: this.getView().getModel("@i18n").getResourceBundle().getText("CancelButton"),
    type: "Emphasized",
    press: function (oEvent) {
      this._cancelChanges(oEvent, this);
    }.bind(this)
  }));
},
// Cancel the changes that were made to the model(that aren't being saved in the backend)
_cancelChanges: function (oEvent, oController) {
  var oModel = oController.getView().getModel();
  oModel.resetChanges();
  this.byId('page').getFooter().getAggregation('content')[1].setVisible(false);
},
// The check function implemented for doing the modifications to the list, and saving it to the backend using oData service
_checkFunction: function (oEvent, vChk, vHomePlant, vMatlDelivery, vRawMatl) {
  var self = this;
  var oTable = self.getView().byId('responsiveTable').getBinding('items').aKeys;
  this.getView().setBusy(true, 1000);

  if (vChk) {
    if(oTable.length > 0)
      var sPath = oTable[0];
      if (sPath) {
        var oItem = self.getView()
          .getModel()
          .getObject('/' + sPath);
        var sWeek;
      if(vChk === this.byId('cb1')){ sWeek = oItem.DairyHistoryCalendarWeek1;}
      if(vChk === this.byId('cb2')){ sWeek = oItem.DairyHistoryCalendarWeek2;}
      if(vChk === this.byId('cb3')){ sWeek = oItem.DairyHistoryCalendarWeek3;}
      if(vChk === this.byId('cb4')){ sWeek = oItem.DairyHistoryCalendarWeek4;}
      if(vChk === this.byId('cb5')){ sWeek = oItem.DairyHistoryCalendarWeek5;}
        this.getView().getModel().callFunction('/A895B09593E01ADA523A4BSet_relevance_flag', { // function import name
          method: 'POST',
          urlParameters: {
            DairyHomePlant: vHomePlant,
            DairyBusinessDeliveryID: vMatlDelivery,
            DairyRawMaterial: vRawMatl,
            Dairyhistorycalendarweek: sWeek,
            Dairyisrlvtforprpslcalc: vChk.getSelected()
          }
        });
        self.getView().setBusy(false);
        self.getView().getModel().refresh();
      }
    }

  
},
// If the user uses more entries in one of the filters, the checkboxes will be deselected because that couldn't be done from the architecture point of view of SAP ABAP
_disableCheckboxes: function (oSmartFilterBar) {

  if (oSmartFilterBar.DairyBusinessDeliveryID !== undefined &&  oSmartFilterBar.DairyBusinessDeliveryID.items.length > 1 ){
    this._toggleCheckboxes(false);
  } else if(	oSmartFilterBar.DairyHomePlant !== undefined && oSmartFilterBar.DairyHomePlant.items.length > 1 ) {
    this._toggleCheckboxes(false);
  }else if(oSmartFilterBar.DairyRawMaterial !== undefined && oSmartFilterBar.DairyRawMaterial.items.length > 1){
    this._toggleCheckboxes(false);
  }
  else{
    this._toggleCheckboxes(true);
  }
},
// helper function
_toggleCheckboxes: function(vBool){
    this.byId('cb1').setEnabled(vBool);
    this.byId('cb2').setEnabled(vBool);
    this.byId('cb3').setEnabled(vBool);
    this.byId('cb4').setEnabled(vBool);
    this.byId('cb5').setEnabled(vBool);
}
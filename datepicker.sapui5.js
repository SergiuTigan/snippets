sap.ui.define(
  [
    'sap/ui/core/format/DateFormat',
    'sap/ui/model/Filter',
    'sap/ui/core/format/NumberFormat',
    'sap/ui/core/ValueState',
    'sap/m/MessageBox',
    'sap/ui/model/json/JSONModel'
  ],
  function(
    DateFormat,
    Filter,
    NumberFormat,
    ValueState,
    MessageBox,
    JSONModel
  ) {
    'use strict';

    return sap.ui.controller(
      'group.msg.dairy.rmp.deliveryscheduling.ext.controller.ListReportExt',
      {
        // ============================================================
        // Lifecycle Methods
        // ============================================================

        onInit: function() {
          this._oUTC = DateFormat.getDateInstance({
            formatOptions: {
              UTC: true
            }
          });
        },

        onBeforeRebindTableExtension: function(oEvent) {
          var oSmartTable = oEvent.getSource();
          var oSmartFilterBar = this.byId(oSmartTable.getSmartFilterId());
          var path = oSmartFilterBar.getParameterBindingPath();
          oSmartTable.setTableBindingPath(path);
        },

        onInitSmartFilterBarExtension: function(oEvent) {
          // Setting a date picker to the current date, and not allowing it to go into the past
          var oKeyDatePicker = this.byId(
            'group.msg.dairy.rmp.deliveryscheduling::sap.suite.ui.generic.template.ListReport.view.ListReport::xDRYxC_RawMatlDelivSchedgTPSet--listReportFilter-filterItemControlA_-_Parameter.p_date'
          );

          var oUTC = DateFormat.getDateInstance({
            formatOptions: {
              style: 'short',
              strictParsing: true,
              UTC: true
            }
          });
          var oCurrDateUTC = oUTC.format(new Date(), false);

          oKeyDatePicker.setValue(oCurrDateUTC);
          oKeyDatePicker.setMinDate(new Date());
        }
      }
    );
  }
);

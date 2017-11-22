/**
  Copyright (c) 2015, 2017, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(
    ['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojbutton', 'ojs/ojinputtext'], function (oj, ko, $) {
    'use strict';

    function ExampleComponentModel(context) {
        var self = this;
        self.composite = context.element;
        //Example observable
        self.messageText = ko.observable('ALL ORDERS');

        self.client = ko.observable();
        self.type = ko.observable();
        self.location = ko.observable();
        self.amount = ko.observable();

        context.props.then(function (propertyMap) {
            self.properties = propertyMap;
        });

        self.newOrders = ko.observableArray([

        ]);
        self.addNewOrder = function(){
          self.newOrders.push({id : Math.random().toFixed(2)*100, client : self.client(), type : self.type(), location: self.location(), amount: self.amount()})
        }

          

        self.ordersInProcess = ko.observableArray([]);

        self.completedOrders = ko.observableArray([]);

        self.processOrder = function(order){

          self.ordersInProcess.push(order);

          var orderList = self.newOrders().filter(function(o){
              return o.id !== order.id;
          });

          self.newOrders(orderList);
        }

        self.completeOrder = function(order){

          self.completedOrders.push(order);

          var processedOrders = self.ordersInProcess().filter(function(p){
            return p.id !== order.id;
          })

          self.ordersInProcess(processedOrders)

        }

    };

    //Lifecycle methods - uncomment and implement if necessary
    //ExampleComponentModel.prototype.activated = function(context){
    //};

    //ExampleComponentModel.prototype.attached = function(context){
    //};

    //ExampleComponentModel.prototype.bindingsApplied = function(context){
    //};

    //ExampleComponentModel.prototype.detached = function(context){
    //};

    return ExampleComponentModel;
});

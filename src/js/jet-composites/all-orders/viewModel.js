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

        context.props.then(function (propertyMap) {
            //Store a reference to the properties for any later use
            self.properties = propertyMap;

            //Parse your component properties here

        });

        self.newOrders = ko.observableArray([
          {id : 123, header : "One", desc : "Order from Canada!"},
          {id : 765, header : "Two", desc : "Another order!"},
          {id : 829, header : "Three", desc : "New order coming!"},
          {id : 469, header : "Four", desc : "New order coming!"},
          {id : 569, header : "Five", desc : "New order coming!"},
          {id : 169, header : "Six", desc : "New order coming!"},
        ]);

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

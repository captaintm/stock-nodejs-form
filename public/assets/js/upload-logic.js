$(document).ready(function() {
    var vm = this;

    vm.vars = {
      personObj:        {},
      personForm:       $('#person-form'),
      nickname:         $('#nickname'),
      firstname:        $('#firstname'),
      lastname:         $('#lastname'),
      submitButton:     $('#submit-button'),
      successBlock:     $('#success-block'),
      successMessage:   $('#success-message'),
      failureBlock:     $('#failure-block'),
      failureMessage:   $('#failure-message')
    };

    // Start off my hiding the success and failuer messages.
    // This should be done with css but we'll quickly
    // hide them with jQuery
    function hideAlertBlocks() {
      vm.vars.successBlock.hide();
      vm.vars.failureBlock.hide();
      vm.vars.successMessage.html('');
      vm.vars.failureMessage.html('');
    }
    // run this function at page load
    hideAlertBlocks();

    // function to clear values
    function clearForm() {
      vm.vars.personObj = {};
      vm.vars.nickname.val('');
      vm.vars.firstname.val('');
      vm.vars.lastname.val('');
    }

    // function for sending field post values
    function sendDataToServer() {
      // hide the messgae blocks
      hideAlertBlocks();

      // prevent the page from refreshing on submit
      vm.vars.personForm.submit(function(e) {
          e.preventDefault();
      });

      // populate the personObj with the fields
      vm.vars.personObj = {
        nickname:   vm.vars.nickname.val(),
        firstname:  vm.vars.firstname.val(),
        lastname:   vm.vars.lastname.val(),
      };

      // Post the data to the /api/person data endpoint
      // so that the data may be entered into the database
      // log any errors that may come back from the server.
      // This is all done via jQuery Ajax
      $.ajax({
          method: 'POST',
          url: '/api/person',
          data: $.param(vm.vars.personObj),
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(function success(response) {
          if (response.success == true) {
            // hide the messgae blocks
            hideAlertBlocks();
            // clear out the form values
            clearForm();
            // show the success message
            vm.vars.successBlock.show();
            vm.vars.successMessage.html(response.message);
          } else if (response.error.code == 11000) {
            // hide the messgae blocks
            hideAlertBlocks();
            // show the failure message
            vm.vars.failureBlock.show();
            vm.vars.failureMessage.html('That Nickname already exists in the database!');
          } else {
            // hide the messgae blocks
            hideAlertBlocks();
            // show the failure message
            vm.vars.failureBlock.show();
            vm.vars.failureMessage.html(response.message);
          }
      });

    }

    // when the submit button is clicked
    vm.vars.submitButton.click(function() {
      // prevent the page from refreshing on submit
      vm.vars.personForm.submit(function(e) {
          e.preventDefault();
      });

      // make sure the form is not empty before sendint the data
      if ((vm.vars.nickname.val() == '') ||
          (vm.vars.lastname.val() == '') ||
          (vm.vars.firstname.val() == '')) {
        // hide the messgae blocks
        hideAlertBlocks();
        // show the failure message
        vm.vars.failureBlock.show();
        vm.vars.failureMessage.html('Please fill out the form.');
      } else {
        // If form is not empty then send the data
        sendDataToServer();
      }
    });

});

function submitForm(){
      var name = document.getElementById('name').value;
      document.getElementById("bill_name").innerText = name;

      var address = document.getElementById('address').value;
      document.getElementById("bill_address").innerText = address;

      var current_unit = Number(document.getElementById('current_unit').value);
      var rate;

      if(current_unit <= 200){
          rate = 6;   
      }
      else if(current_unit <= 500){
          rate = 8;   
      }
      else if(current_unit <= 1000){
          rate = 10;  
      }
      else {
          rate = 12;  
      }
      document.getElementById("fix_unit").innerText = "₹" + rate;

      var unitcharge = current_unit * rate;
      document.getElementById("bill_unit").innerText = "₹" + unitcharge.toFixed(2);

      var taxPercent;
      if(unitcharge <= 2000){
          taxPercent = 5;   
      }
      else if(unitcharge <= 5000){
          taxPercent = 8;   
      }
      else if(unitcharge <= 10000){
          taxPercent = 12;  
      }
      else {
          taxPercent = 15;  
      }
      document.getElementById("tax_percent").innerText = taxPercent + "%";

      var tax = unitcharge * (taxPercent / 100); 
      document.getElementById("tax").innerText = "₹" + tax.toFixed(2);
      
      var total = unitcharge + tax;
      document.getElementById("totalpayment").innerText = "₹" + total.toFixed(2);
    }
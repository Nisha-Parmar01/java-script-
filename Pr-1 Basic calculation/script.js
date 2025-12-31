       function calculateTip() {
        var bill = Number(document.getElementById('bill').value);
        var tipPercent =Number(document.getElementById('tip').value);
        var people = Number(document.getElementById('people').value);

        var tip = bill * (tipPercent / 100);
        var totalBill = bill + tip;
        var tipPerPerson = tip / people;
        var totalPerPerson = totalBill / people;

        document.getElementById("tipPerPerson").innerHTML = "$" + tipPerPerson.toFixed(2);
        document.getElementById("totalPerPerson").innerHTML = "$" + totalPerPerson.toFixed(2);
        document.getElementById("totalBill").innerHTML = "$" + totalBill.toFixed(2);
    }

    function resetForm() {
        document.getElementById('bill').value = "";
        document.getElementById('tip').value = "";
        document.getElementById('people').value = "";
        document.getElementById("tipPerPerson").innerHTML = "$0.00";
        document.getElementById("totalPerPerson").innerHTML = "$0.00";
        document.getElementById("totalBill").innerHTML = "$0.00";
    }
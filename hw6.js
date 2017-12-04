 /* 
<!--
Name: Connor Lord, connor_lord@cs.uml.edu
Computer Science Student, UMass Lowell
Comp.4610, GUI Programming I
File: Using javascript, the assignment was to create functions that can alter a 
table to display $/mile of entered in values. My functions can, add a row, add a 
column, add both, and delete what's already in the table.
Last updated by CL: 10-nov-2017, 18.21
-->
 */

//master function
function append_table() {
    var count;
    var i, j, k;
    var price = document.getElementById('MSRP').value;
    var price1 = document.getElementById('MSRP1').value;
    var gas = document.getElementById('Gallon').value;
    var gas1 = document.getElementById('Gallon1').value;

    var diffp = (floater(price1) - floater(price)) / 5;
    var diffg = (floater(gas1) - floater(gas)) / 5;
    j = 0;

    var arrayp = new Array();
    var arrayg = new Array();


    var table = document.createElement("TABLE");

    var row = table.insertRow(0);
    var cell = row.insertCell(0);
    cell.innerHTML = "Price/Fuel <br />consumption";
    for (var i = 1; i <= 6; i++) {
        cell = row.insertCell(i);
        cell.innerHTML = floater(parseInt(price) + j);
        arrayp.push(floater(parseInt(price) + j));
		
	j += diffp;
    }
    j = 0;

    for (var i = 1; i <= 6; i++) {
        row = table.insertRow(i);
        cell = row.insertCell(0);
        cell.innerHTML = floater(parseInt(gas) + j);
        arrayg.push(floater(parseInt(gas) + j));

        for (var k = 1; k <= 6; k++) {
            cell = row.insertCell(k);
            cell.innerHTML = cost_per_mile(arrayp[k - 1], arrayg[i - 1])
        }

        j += diffg;

    }

 

    var myTable = document.getElementById("myTable");
    myTable.innerHTML = "";
    myTable.appendChild(table);



    delete_all_cells();
    if (price1 > 0 && price2 > 0 && price3 > 0 && price4 > 0) {
    	for (count = 0; count < 6; count++) {
    		add_row();
    		add_column();
    	}

    	new_edit_nodes();
    	edit_nodes();

    }

}





//builds each individual cell
function cell_generator(cell, type, value) {
    var temp = document.createElement('div');
    var input = document.createTextNode(value);
    temp.appendChild(input);
    temp.setAttribute('class', type);

    cell.appendChild(temp);
}

//builds table rows
function add_row() {
    var table = document.getElementById('myTable');
    var row = table.insertRow(table.rows.length);
    
    var index; //loop counter
    var mpg = document.getElementById('Gallon').value;

    //sets the first column for miles per gallon
    cell_generator(row.insertCell(index), 'row', mpg);
    
    //makes sure the first value of every column is the mpg
    for(index = 1; index < table.rows[0].cells.length; index++) {
	cell_generator(row.insertCell(index), 'row', index);
    }

    
    
}

//builds table columns by adding to the end of every row
function add_column() {
    var table = document.getElementById('myTable');
    var index; //loop counter
    var price = document.getElementById('MSRP').value;

    //adds cells onto the end of rows
    for (index = 0; index < table.rows.length; index++) {
	if(index == 0) {
	    cell_generator(table.rows[index].insertCell(table.rows[index].cells.length), 'col', price);
	}
	else {
	
	    cell_generator(table.rows[index].insertCell(table.rows[index].cells.length), 'col', index);
	}
	
    }

    
}

//frustrating, had to use match function to edit the correct answers into the table
function edit_nodes() {
    var table = document.getElementById('myTable');
    var i, j, k;
    
    for (i = 1; i < table.rows.length; i++) {
	for (j = 1; j < table.rows[i].cells.length; j++) {
	    k = document.getElementById("myTable").rows[i].cells[j];

	    var num1 = table.rows[0].cells[j].innerHTML;
	    var num2 = table.rows[i].cells[0].innerHTML;
	    var final1 = num1.match(/\d+/)[0];
	    var final2 = num2.match(/\d+/)[0];
	    table.rows[0].cells[j].value = final1;
	    table.rows[i].cells[0].value = final2;
	    
	    k.innerHTML = cost_per_mile(
		parseInt(table.rows[0].cells[j].value),
		parseInt(table.rows[i].cells[0].value));
	    k.innerHTML += "($/mi)";
	}
    }
}

function new_edit_nodes() {
    	var table = document.getElementById('myTable');
    	var i, j, k;
	var price = document.getElementById('MSRP').value;
	var price1 = document.getElementById('MSRP1').value;
	var gas = document.getElementById('Gallon').value;
	var gas1 = document.getElementById('Gallon1').value;

	var diffp = (floater(price1) - floater(price)) / 5;
	var diffg = (floater(gas1) - floater(gas)) / 5;
	j = 0;
    
	for (i = 1; i <= 6; i++) {
		k = document.getElementById("myTable").rows[0].cells[i];
		var num1 = table.rows[0].cells[i].innerHTML;
		var final1 = num1.match(/\d+/)[0];
		table.rows[0].cells[i].value = final1;
		k.innerHTML = floater(parseInt(price) + j);
		
		j += diffp;
		//k.innerHTML += "money";
	}

	j = 0;

	for (i = 1; i <= 6; i++) {
		k = document.getElementById("myTable").rows[i].cells[0];
		var num1 = table.rows[i].cells[0].innerHTML;
		var final1 = num1.match(/\d+/)[0];
		table.rows[i].cells[0].value = final1;
		k.innerHTML = floater(parseInt(gas) + j);
		
		j += diffg;
	}

}


function floater(stuff) {
	return parseFloat(Math.round(stuff * 100) / 100).toFixed(2);
}

//actual math function
function cost_per_mile(cost, mile) {
    
    var result = cost / mile;
    return parseFloat(Math.round(result * 100) / 100).toFixed(2);
}

//deletes all cells except the guide cell
function delete_all_cells() {
    var table = document.getElementById('myTable');
    var i, j;

    for (i = 0; i < table.rows.length; i++) {
	for (j = table.rows[i].cells.length - 1; j >= 0; j--) {
	    if (i != 0 || j != 0) {
		table.rows[i].deleteCell(j);
	    }
	}
    }

    for(i = table.rows.length - 1; i > 0; i--) {
	table.deleteRow(i);
    }
}

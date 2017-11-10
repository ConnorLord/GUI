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
    add_row();
    add_column();
    edit_nodes();
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

    //edits the final output
    edit_nodes();
    
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

    //edits the final output
    edit_nodes();
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
	}
    }
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

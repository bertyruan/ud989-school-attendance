/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
/*
function(){
        if (!localStorage.attendance) {
        console.log('Creating attendance records...');
        function getRandom() {
            return (Math.random() >= 0.5);
        }

        var nameColumns = $('tbody .name-col'),
            attendance = {};

        nameColumns.each(function() {
            var name = this.innerText;
            attendance[name] = [];

            for (var i = 0; i <= 11; i++) {
                attendance[name].push(getRandom());
            }
        });

        localStorage.attendance = JSON.stringify(attendance);
    }
    */

$(function(){
    octopus.init();
});

var model = {
    days: 12,
    students: 5,
    studentNames : [
        {
            name: "Slappy the Frog"
            

        },
        {
            name: "Lily the Lizard"
        },
        {
            name: "Paulrus the Walrus"
        },
        {
            name: "Gregory the Goat"
        },
        {
            name: "Adam the Anaconda"
        }
    ],
    init: function(){
        if(!localStorage.attendance)
        {
            localStorage.attendance = JSON.stringify([]);

        }
    },
    add: function(obj){
        var data = JSON.parse(localStorage.attendance);
        data.push(obj);
        localStorage.attendance = JSON.stringify(data);
    },
    getAllAttendance: function(){
        return JSON.parse(localStorage.attendance);
    }
};

var octopus = {
    init: function(){
        view.renderTableHead();
        view.renderTableRow();
        view.renderMissed();
    },
    getAttendance: function(){
        return model.getAllAttendance();
    },
    getDays: function(){
        return model.days;
    },
    getNumberStudents: function(){
        return model.students;
    }

};

var view = {
    init: function(){
        this.allMissed = $('tbody .missed-col');
        this.allCheckboxes = $('tbody input');

    },
    renderTableHead: function(){
        for(var i=octopus.getDays();i>0;i--)
        {
            $("<th>"+i+"</th>").insertAfter('thead .name-col');

        }
    },
    renderTableRow: function(){
        $.each(octopus.getAttendance(), function(index,element){
            //create table row
            var newTR = document.createElement("tr");
            newTR.setAttribute('class', 'student');

            //add name
            var newTD = document.createElement("td");
            newTD.setAttribute('class', 'name-col');
            newTD.textContent = index;
            newTR.appendChild(newTD);

            //create checkboxes
            $.each(element, function(){
                var newInput = document.createElement("input");
                newInput.setAttribute('type', 'checkbox');
                var newTD2 = document.createElement("td");
                newTD2.setAttribute('class', 'attend-col');
                newTD2.appendChild(newInput);
                newTR.appendChild(newTD2);
            });
            
            //add missing column
            var newTD3 = document.createElement("td");
            newTD3.setAttribute('class', 'missed-col');
            newTD3.textContent = 0;//to be changed
            newTR.appendChild(newTD3);

            //add tr to tbody
            $('tbody').append(newTR);
        });       
    }
};


/* STUDENT APPLICATION */
var hello = function(){
        

    // Count a student's missed days
    function countMissing() {
        $allMissed.each(function() {
            var studentRow = $(this).parent('tr'),
                dayChecks = $(studentRow).children('td').children('input'),
                numMissed = 0;

            dayChecks.each(function() {
                if (!$(this).prop('checked')) {
                    numMissed++;
                }
            });

            $(this).text(numMissed);
        });
    }

    // Check boxes, based on attendace records
    $.each(attendance, function(name, days) {
        var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
            dayChecks = $(studentRow).children('.attend-col').children('input');

        dayChecks.each(function(i) {
            $(this).prop('checked', days[i]);
        });
    });

    // When a checkbox is clicked, update localStorage
    $allCheckboxes.on('0click', function() {
        var studentRows = $('tbody .student'),
            newAttendance = {};

        studentRows.each(function() {
            var name = $(this).children('.name-col').text(),
                $allCheckboxes = $(this).children('td').children('input');

            newAttendance[name] = [];

            $allCheckboxes.each(function() {
                newAttendance[name].push($(this).prop('checked'));
            });
        });

        countMissing();
        localStorage.attendance = JSON.stringify(newAttendance);
    });

    countMissing();
};

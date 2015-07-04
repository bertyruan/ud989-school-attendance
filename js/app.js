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
        view.renderTable();
        view.renderCheckBoxes();
        view.renderMissed();
    },
    getAttendance: function(){
        return model.getAllAttendance();
    },
    getDays: function(){
        return model.days;
    }

};

var view = {
    init: function(){
        this.allMissed = $('tbody .missed-col');
        this.allCheckboxes = $('tbody input');

    },
    renderTable: function(){
        for(var i=octopus.getDays();i>0;i--)
        {
            $("<th>"+i+"</th>").insertAfter('thead .name-col');
        }
    },
    renderCheckBoxes: function(){
        console.log("hi");
        var htmlStr = "";
        $.each(octopus.getAttendance(), function(index, element){
            console.log(index,element);
        });
        for(var i=0;i<octopus.getDays();i++)
        {
            htmlStr += '<td class="attend-col"><input type="checkbox"></td>';
        }
        return htmlStr;
    },
    renderMissed: function(){

    }
};


/* STUDENT APPLICATION */
function hello() {
        

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

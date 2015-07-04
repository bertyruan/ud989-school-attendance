//Refcator Spaghetti Code Project

$(function(){
    octopus.init();
});

function getRandom() {
    return (Math.random() >= 0.5);
}

var model = {
    days : 12,
    studentNames : [
        {
            name: "Slappy the Frog",
            attendance: []
        },
        {
            name: "Lily the Lizard",
            attendance: []
        },
        {
            name: "Paulrus the Walrus",
            attendance: []
        },
        {
            name: "Gregory the Goat",
            attendance: []
        },
        {
            name: "Adam the Anaconda",
            attendance: []
        }
    ],
    init: function(){
        if(!localStorage.attendance)
        {
            console.log('Creating attendance records...');
            for(var i=0;i<model.studentNames.length();i++)
            {
                for(var j=0;j<model.days;j++)
                {
                    model.studentNames[i].attendance[j] = getRandom();
                }
            }
            localStorage.attendance = JSON.stringify(this.studentNames);
        }
    },
    getAllAttendance: function(){
        return JSON.parse(localStorage.attendance);
    },
    updateAttendance: function(attendance){
        var newAttendance = model.getAllAttendance();
        $.each(newAttendance, function(index,element){
                element.attendance = attendance[index];
        });
        localStorage.attendance = JSON.stringify(newAttendance);
    }
};



var octopus = {
    init: function(){
        model.init();
        view.init();
    },
    getAttendance: function(){
        return model.getAllAttendance();
    },
    getDays: function(){
        return model.days;
    },
    updateModel: function(checkedFields){
        var table = [];
        $.each(checkedFields, function(index, element){
            var row = [];

            element.each(function() {
                row.push($(this).prop('checked'));
            });
            table.push(row);
        });
        model.updateAttendance(table);
    }
};



var view = {
    init: function(){
        view.renderTableHead();
        view.renderTableRow();
        view.refresh();
        this.updateFields();
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
            newTR.setAttribute('id', 'student'+index);

            //add name
            var newTD = document.createElement("td");
            newTD.setAttribute('class', 'name-col');
            newTD.textContent = element.name;
            newTR.appendChild(newTD);

            //create checkboxes
            $.each(element.attendance, function(i){
                var newInput = document.createElement("input");
                newInput.setAttribute('type', 'checkbox');
                newInput.setAttribute('id', String(index)+String(i));
                var newTD2 = document.createElement("td");
                newTD2.setAttribute('class', 'attend-col');
                newTD2.appendChild(newInput);
                newTR.appendChild(newTD2);
            });
            
            //add missing column
            var newTD3 = document.createElement("td");
            newTD3.setAttribute('class', 'missed-col');
            newTR.appendChild(newTD3);

            //add tr to tbody
            $('tbody').append(newTR);
        });       
    },
    updateFields: function() {
        $allCheckboxes = $('tbody input');
        $allCheckboxes.on('click', function() {
            var data = [];
            var studentRows = $('tbody .student');
            studentRows.each(function() {
                var name = $(this).children('.name-col').text();
                $allCheckboxes = $(this).children('td').children('input');
                data.push($allCheckboxes);
            });
            console.log(data);
            octopus.updateModel(data);
        });
        this.countMissing();
    },
    countMissing: function() {
        $allMissed = $('tbody .missed-col');
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
    },
    refresh: function(){
        $.each(octopus.getAttendance(), function(index, element) {
            for(var i=0;i<octopus.getDays();i++)
            {
                $("#"+String(index)+String(i)).prop('checked',element.attendance[i]);
            }
        });
    }
};
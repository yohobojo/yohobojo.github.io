var resume;
var workToggleBool = true;
var schoolToggleBool = true;
var miscToggleBool = true;

function displayHeader() {
    $('#name').html(resume.name);
    $('#phone').html(resume.phone);
    $('#email').html(resume.email);
}

function toggleSection(id, toggleBool) {
    if (toggleBool == true) {
        $('#' + id).css('display', 'block');
    }
    else {
        $('#' + id).css('display', 'none');
    }
}

function toggleWork() {
    workToggleBool = !workToggleBool;
    toggleSection('work', workToggleBool);

}

function displayWork() {
    $('#work').html('');
    for (let i = 0; i < resume.work.length; i++) {
        $('#work').append('<p><b>' + resume.work[i].employer + '</b>' + ' ' + '-' + ' ' + '<i>' + resume.work[i].location + '</i>' + '</p>');
        $('#work').append('<p class="workSchoolSubtitle"><b>' + resume.work[i].title + '</b>' + ' ' + '-' + ' ' + '<i>' + resume.work[i].daterange + '</i>' + '</p>');
        $('#work').append(makeWorkList(i));
        $('#work').append('<br>');
    }
}

function makeWorkList(i) {
    var listString = '<ul class="bulletPoints">';
    for (let j = 0; j < resume.work[i].duties.length; j++) {
        listString += '<li>' + resume.work[i].duties[j] + '</li>';
    }
    listString += '</ul>';
    return listString;
}

function toggleSchool() {
    schoolToggleBool = !schoolToggleBool;
    toggleSection('school', schoolToggleBool);
}

function displaySchool() {
    $('#school').html('');
    for (let i = 0; i < resume.education.length; i++) {
        $('#school').append('<p>' + resume.education[i].school + '</p>');
        $('#school').append('<p class="workSchoolSubtitle">' + resume.education[i].location + '</p>');
        $('#school').append('<br>');
    }
}

function toggleMisc() {
    miscToggleBool = !miscToggleBool;
    toggleSection('misc', miscToggleBool);
}

function displayMisc() {
    // $('#misc').html('');
    // for (let i = 0; i < resume.miscItems.length; i++) {
    //     $('#misc').append('<p>' + resume.miscItems[i] + '</p>');
    // }
    $('#misc').html(makeMiscList());
    $('#misc').append('<br>');
}

function makeMiscList() {
    var listString = '<ul>';
    for (let i = 0; i < resume.miscItems.length; i++) {
        listString += '<li>' + resume.miscItems[i] + '</li>';
    }
    listString += '</ul>';
    return listString;
}

function displayFromJson() {
    displayHeader();
    displayWork();
    displaySchool();
    displayMisc();
    $(".workHeading").click(toggleWork);
    $(".schoolHeading").click(toggleSchool);
    $(".miscHeading").click(toggleMisc);
}

$(document).ready(function () {
    $.getJSON('resume.json', function (resumeData) {
        resume = resumeData;
        displayFromJson();
    });
});
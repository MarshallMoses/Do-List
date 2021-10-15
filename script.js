//refresh list from server data

var refreshList = function() {

    $.ajax({
        type: 'GET',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=163',
        dataType: 'json',
        success: function (response, textStatus) {

        $('.do-list').html('');

        response.tasks.forEach(function (item) {

            var task = item.content;
            var taskID = item.id;

            $('.do-list').append('<li id="' + 
            taskID + '" class="list-group-item taskItem"><button class="btn btn-outline-primary d-inline checkButton"><i class="fas fa-check"></i></button><div class="m-3 taskText d-inline h5">' + 
            task + 
            '</div><button class="btn btn-danger d-inline float-right delete""><i class="fas fa-times"></i></button></li>');

        });


        },
        error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
        }
    });

}

//function to add tasks

var addTask = function () {

    var input = $('input');

    if (input) {

        $.ajax({
            type: 'POST',
            url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=163',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
              task: {
                content: input.val()
              }
            }),
            success: function (response, textStatus) {

                refreshList();
                //clear input value field
                input.val('');

            },
            error: function (request, textStatus, errorMessage) {
              console.log(errorMessage);
            }
          });

    }

}

//on delete button - delete things

$(document).on('click', '.btn.delete', function (event) {

    var item = $(this).closest('li');
    var id = item.attr("id");

    $.ajax({
        type: 'DELETE',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '?api_key=163',
        success: function (response, textStatus) {

          item.remove();

        },
        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
    });

});

//call function on document load

$(document).ready(function () {

    refreshList();

});

//function to toggle check on task

$(document).on('click', '.checkButton', function (event){

    $(this).closest('li').toggleClass("list-group-item-dark");
    $(this).toggleClass("btn-outline-success");

});
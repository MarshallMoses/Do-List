//refresh list from server data

var refreshList = function() {

    $.ajax({
        type: 'GET',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=163',
        dataType: 'json',
        success: function (response, textStatus) {

        //sort response by id

        var sortedResponse = response.tasks.slice().sort((a, b) => b.id - a.id);

        $('.do-list').html('');

        sortedResponse.forEach(function (item) {

            var task = item.content;
            var taskID = item.id;
            var completed = item.completed;

            if (!completed) {

                $('.do-list').append('<li id="' + 
                taskID + '" class="list-group-item taskItem"><button class="btn btn-outline-primary d-inline checkButton"><i class="fas fa-check"></i></button><div class="m-3 taskText d-inline h5">' + 
                task + 
                '</div><button class="btn btn-danger d-inline float-right delete""><i class="fas fa-times"></i></button></li>');

            } else {

                $('.do-list').append('<li id="' + 
                taskID + '" class="list-group-item taskItem list-group-item-dark"><button class="btn btn-outline-primary d-inline checkButton btn-outline-success"><i class="fas fa-check"></i></button><div class="m-3 taskText d-inline h5">' + 
                task + 
                '</div><button class="btn btn-danger d-inline float-right delete""><i class="fas fa-times"></i></button></li>');

            }

        });


        },
        error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
        }
    });

}

//function to add tasks

$(document).on('click', '.btn.addTask', function (event) {

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

});

//on delete button - delete thing

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

//function to mark complete or active
//logic: on click > check item with get request > if completed is false set to true, else set to false > refresh list

$(document).on('click', '.btn.checkButton', function (event) {

    var item = $(this).closest('li');
    var id = item.attr("id");

    $.ajax({
            type: 'GET',
            url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '?api_key=163',
            dataType: 'json',
            success: function (response, textStatus) {
    
                if (response.task.completed) {

                    $.ajax({
                        type: 'PUT',
                        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/'+ id +'/mark_active?api_key=163',
                        contentType: 'application/json',
                        dataType: 'json',
                        success: function (response, textStatus) {

                            refreshList();
            
                        },
                        error: function (request, textStatus, errorMessage) {
                          console.log(errorMessage);
                        }
                      });
            
                } else {
            
                    $.ajax({
                        type: 'PUT',
                        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/'+ id +'/mark_complete?api_key=163',
                        contentType: 'application/json',
                        dataType: 'json',
                        success: function (response, textStatus) {

                            refreshList();
            
                        },
                        error: function (request, textStatus, errorMessage) {
                          console.log(errorMessage);
                        }
                      });
            
                };

    
            },
            error: function (request, textStatus, errorMessage) {
              console.log(errorMessage);
            }
    });

});


//call refresh function on document load

$(document).ready(function () {

    refreshList();

});
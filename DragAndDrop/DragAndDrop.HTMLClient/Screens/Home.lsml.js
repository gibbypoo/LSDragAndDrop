/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.Home.TasksNotStartedTemplate_postRender = function (element, contentItem) {
    // Write code here.
    makeDraggable(element, contentItem.data.Id);
};

function makeDraggable(element, taskId) {
    //Get the entire list item
    var listItem = $(element).closest("li");

    //Enable draggable feature
    listItem.attr("draggable", true);

    //Pass taskId along with the listItem when it is being dragged
    listItem[0].ondragstart = function (e) {
        e.dataTransfer.setData("Text", taskId.toString());
    };
}

myapp.Home.TasksInProgressTemplate_postRender = function (element, contentItem) {
    // Write code here.
    makeDraggable(element, contentItem.data.Id);
};
myapp.Home.TasksCompletedTemplate_postRender = function (element, contentItem) {
    // Write code here.
    makeDraggable(element, contentItem.data.Id);
};
myapp.Home.Group_postRender = function (element, contentItem) {
    // Write code here.
    $(document).on("pagechange", function (e) {

        if (e.currentTarget.nameProp === "Home") {

            contentItem.screen.TasksCompleted.refresh();

            contentItem.screen.TasksInProgress.refresh();

            contentItem.screen.TasksNotStarted.refresh();

        }

    });

};

function enableDrop(element, stateType, screen) {
    var ulElement = $(element).find("ul").closest("div");
    ulElement[0].ondragover = function (e) {
        e.preventDefault();
    };
    ulElement[0].ondrop = function (e) {
        //Get TaskId
        var data = e.dataTransfer.getData("Text");
        var filter = "Id eq " + data;
        myapp.activeDataWorkspace.ApplicationData.Table1Items.filter(filter). //ApplicationData.Tasks.filter(filter).
            execute().then(function (result) {
                //Change state of Task
                result.results[0].State = stateType;
                return myapp.activeDataWorkspace.ApplicationData.saveChanges();
            }).then(function () {
                //Refresh all 3 lists
                screen.TasksNotStarted.refresh();
                screen.TasksInProgress.refresh();
                screen.TasksCompleted.refresh();
            });
    }
}
myapp.Home.TasksNotStarted_postRender = function (element, contentItem) {
    // Write code here.
    $(element).find("ul").closest("div").css("background", "#FFB6C1");
    enableDrop(element, "Not Started", contentItem.screen);
};
myapp.Home.TasksInProgress_postRender = function (element, contentItem) {
    // Write code here.
    $(element).find("ul").closest("div").css("background", "#FFE4B5");
    enableDrop(element, "In Progress", contentItem.screen);
};
myapp.Home.TasksCompleted_postRender = function (element, contentItem) {
    // Write code here.
    $(element).find("ul").closest("div").css("background", "#90EE90");
    enableDrop(element, "Completed", contentItem.screen);
};
function fetchAndDisplayRecipes() {
    $.ajax({
        url: "https://usman-fake-api.herokuapp.com/api/recipes/",
        method: "GET",
        success: function(response) {
            displayRecipes(response);
        },
        error: function(error) {
            console.error("Failed to fetch recipes:", error);
        }
    });
}

function displayRecipes(recipes) {
    $("#data").empty();
    recipes.forEach(function(recipe) {
        displaySingleRecipe(recipe);
    });
}
function displaySingleRecipe(recipe) {
    var recipeElement = `
        <div class="recipe" id="${recipe._id}">
            <h2>${recipe.title}</h2>
            <p>${recipe.body}</p>
            <button type="button" class="btn btn-danger delete">Delete</button>
            <button type="button" class="btn btn-info edit">Edit</button>
        </div>`;
    $("#data").append(recipeElement);

    $(`#${recipe._id}`).on("click", ".delete", function() {
        deleteRecipe(recipe._id);
    });

    $(`#${recipe._id}`).on("click", ".edit", function() {
        editRecipe(recipe);
    });
}

function deleteRecipe(id) {
    $.ajax({
        url: `https://usman-fake-api.herokuapp.com/api/recipes/${id}`,
        method: "DELETE",
        success: function() {
            $(`#${id}`).remove();
        },
        error: function() {
            console.error("Failed to delete the recipe");
        }
    });
}

function addNewRecipe() {
    var title = $("#title").val();
    var body = $("#body").val();

    $.ajax({
        url: "https://usman-fake-api.herokuapp.com/api/recipes/",
        method: "POST",
        data: { title: title, body: body },
        success: function() {
            console.log("Recipe added successfully");
            fetchAndDisplayRecipes();
        },
        error: function() {
            console.error("Failed to add a new recipe");
        }
    });
}

function editRecipe(recipe) {
    $("#updateId").val(recipe._id);
    $("#updateTitle").val(recipe.title);
    $("#updateDescription").val(recipe.body);
    $("#updateModal").modal("show");

    $("#save").off("click").on("click", function() {
        updateRecipe(recipe._id);
    });
}

function updateRecipe(id) {
    var title = $("#updateTitle").val();
    var body = $("#updateDescription").val();

    $.ajax({
        url: `https://usman-fake-api.herokuapp.com/api/recipes/${id}`,
        method: "PUT",
        data: { title: title, body: body },
        success: function() {
            $("#updateModal").modal("hide");
            fetchAndDisplayRecipes();
        },
        error: function() {
            console.error("Failed to update the recipe");
        }
    });
}

$(function() {
    fetchAndDisplayRecipes();
    $("#addRecipe").click(addNewRecipe);
});

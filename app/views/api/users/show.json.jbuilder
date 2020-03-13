# Builds a json object using the user partial view.
# @user comes from the users controller
json.partial! "api/users/user", user: @user
# Builds a json object from a collection of users. 
# Each key is the id of a user, and the value is a json object built using the user partial view.
# @users comes from the users controller
@users.each do |user|
    json.set! user.id do
        json.partial! "api/users/user", user: user
    end
end
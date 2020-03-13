class Api::UsersController < ApplicationController

    # Retrieves all users from db, then renders api/users/index view
    def index
        @users = User.all
        render "api/users/index"
    end

    # Creates a user object from filtered params, then logs user in and renders api/users/show view if successfully persists to db, or renders errors otherwise
    def create
        @user = User.new(user_params)
        @user.balance = 5000
        if @user.save
            log_user_in!(@user)
            render "api/users/show"
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    # Looks up user by id from params, then renders api/users/show view if a user with that id is found
    def show
        @user = User.find_by(id: params[:id])
        render "api/users/show" if @user
    end

    private

    # Filters params so that only params with a key of user is allowed, and only reads the email and password subkeys
    def user_params
        params.require(:user).permit(:email, :password)
    end

end
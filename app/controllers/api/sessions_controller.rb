class Api::SessionsController < ApplicationController

    # Validates email and password from params. 
    # If validated, calls log_user_in application controller function and renders api/users/show view.
    # If validation fails, renders a descriptive error.
    def create
        email = params[:user][:email]
        pw = params[:user][:password]
        @user = User.find_by_credentials(email, pw)
        if @user
            log_user_in!(@user)
            render "api/users/show"
        else
            render json: "Your email or password were incorrect.", status: 422
        end
    end

    # Logs user out by calling log_user_out! function from application controller.
    def destroy
        log_user_out!
    end


end